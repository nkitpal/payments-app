const express = require("express");
const router = express.Router();
const {signupBody, signinBody, updateBody} = require("../types");
const {User, Account} = require("../db");
const {JWT_SECRET} = require("../config")
const jwt = require("jsonwebtoken");

const { authMiddleware } = require("../middleware")

router.post("/signup", async (req,res) => {
    const { success }  = signupBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "inputs are invalid!"
        })
        return;
    }

    const existingUser = await User.findOne({
        username: req.body.username,
    });

    if(existingUser){
        res.status(411).json({
            message: "User already exists, head towards Signin!"
        })
        return;
    }

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: req.body.password
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance : 1 + Math.random()*1000,
    })

    const token = jwt.sign({userId}, JWT_SECRET);

    res.status(200).json({
        message:`Welcome to Paytm ${user.firstName}`,
        token: toke
    });
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Inputs invalid!"
        })
        return;
    }

    const user = await User.findOne({
        username: req.body.username
    })

    if(user){
        const userId = user._id;
        const token = jwt.sign({userId}, JWT_SECRET);

        res.status(200).json({
            token
        })
    }
    else{
        res.status(403).json({
            message: "User Does not exist, SignUp!"
        })
    }
})



router.put("", authMiddleware, async (req, res) => {

    const { success } = updateBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "enter valid update lengths"
        })
        return;
    }

    User.updateOne({
        _id : req.userId
    },{
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: req.body.password,
    })
    const user = await User.findOne({
        _id : req.userId
    })
    res.status(200).json({message:`updated to ${user.firstName}, ${user.lastName} and password is ${user.password}`});
})

router.get("/bulk", authMiddleware, async (req, res) => {
    const name = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName:{
                $regex : name
            }
        },{
            lastName: {
                $regex: name
            }
        }
        ]
        
    })
    res.status(200).json({
            users : users.map((user) => {return {
                username: user.username,
                firstName: user.firstName,
                lastName:  user.lastName,
                _id : user._id
            }})
    })
})

router.get("/info", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const user = await User.findOne({
        _id: userId
    })
    console.log(user);
    res.status(200).json({
        username : user.username,
        firstname: user.firstName,
        lastname: user.lastName 
    })
})

module.exports = router