const Users = require("../models/usersSchema");
const jwt = require('jsonwebtoken');

// Functions

const paramIsEmpty = (req, res, next, text) => {
    if(!req){
        return res.status(400).send(text);
    }

    return next();
}


// Middlewares

const isNotAuthenticated = async (req, res, next) => {
    const token = req.get("X-Session-Token");
    
    if(!token){
        return res.status(401).send("'X-Session-Token' HEADER IS EMPTY");
    }

    let decoded;
    try{
        decoded = jwt.verify(token, "secretkey");
    } catch(error){
        return res.status(401).send("INVALID TOKEN");
    }    

    const currentDate = new Date();
    const {idUser, iat} = decoded;
    const expirationDate = new Date(iat * 1000);

    if(currentDate >= expirationDate){
        return res.status(401).send("TOKEN EXPIRED");
    }

    decoded = await Users.findById(idUser);

    req.decoded = decoded;

    return next();
}

const isInvalidRoleParam = (req, res, next) => {
    if(req.body.role){
        return res.status(401).send("FORBIDDEN PARAM");
    }

    return next();
}

const usernameIsEmpty = (req, res, next) => paramIsEmpty(req.body.username, res, next, "USERNAME PARAM IS EMPTY");
const passwordIsEmpty = (req, res, next) => paramIsEmpty(req.body.password, res, next, "PASSWORD PARAM IS EMPTY");
const competitorNameIsEmpty = (req, res, next) => paramIsEmpty(req.body.name, res, next, "NAME PARAM IS EMPTY");


exports.isNotAuthenticated = isNotAuthenticated;
exports.usernameIsEmpty = usernameIsEmpty;
exports.passwordIsEmpty = passwordIsEmpty;
exports.competitorNameIsEmpty = competitorNameIsEmpty;
exports.isInvalidRoleParam = isInvalidRoleParam;
