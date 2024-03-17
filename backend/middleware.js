const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

function authMiddleware(req, res, next){
    const auth = req.headers.authorization;
    
    if(!auth || auth.split(" ")[0] != "Bearer"){
        res.status(403).json({
            message: "Authentication not valid!",
        })
        return;
    }


    try{
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(e){
        res.status(403).json({
            message: "Session Expired!",
        })
        return;
    }

}

module.exports = {
    authMiddleware
};