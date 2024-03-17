const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account, User } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();


router.get('/balance',authMiddleware , async (req,res) => {
    const userId = req.userId;

    const account = await Account.findOne({
        userId,
    })

    const user = await User.findOne({
        _id: userId
    })
    res.status(200).json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const senderId = req.userId;

    const session = await mongoose.startSession();

    session.startTransaction();

    const {amount, receiverId} = req.body;
    console.log(req.body)

    const senderAccount = await Account.findOne({
        userId: senderId,
    }).session(session);

    console.log(senderAccount);

    if(!senderAccount || senderAccount.balance < amount){
        await session.abortTransaction();
        res.status(400).json({
            message: "insuffiecient balance!"
        })
        return;
    }

    const toAccount = await Account.findOne({
        userId: receiverId,
    }).session(session);

    if(!toAccount){
        session.abortTransaction();
        res.status(400).json({
            message: "Receiver account doesn't exist, enter a valid account!",
        })
    }

    await Account.updateOne({
        userId : senderId,
    },{
        $inc : {balance: -amount}
    }).session(session);

    await Account.updateOne({
        userId : receiverId,
    },{
        $inc : {
            balance: amount
        }
    }).session(session);

    const sender = await Account.findOne({
        userId: senderId,
    }).session(session);

    await session.commitTransaction();

    res.status(200).json({
        balance : sender.balance
    })
})

module.exports = router;
