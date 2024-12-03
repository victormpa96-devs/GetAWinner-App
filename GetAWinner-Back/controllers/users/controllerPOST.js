const Users = require("../../models/usersSchema");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');
moment().format(); 

exports.postUser = async (req, res) => {

    try{
        const isRepeated = await Users.findOne({username: req.body.username}, "username");

        if(isRepeated){
            return res.status(409).send("USERNAME ALREADY EXISTS");
        }

        const newUser = {
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, saltRounds),
            createdOn: new Date(),
            role: req.body.role !== undefined && req.body.role
        }
    
        const user = await Users.create(newUser);
        return res.status(201).json(user);

    } catch (error) {
        return res.sendStatus(500);
    }
    
}

exports.loginUser = async (req, res) => {

    try {
        const user = await Users.findOne({ username: req.body.username });
        
        if (!user) {
            return res.sendStatus(401);
        }

        const result = await bcrypt.compare(req.body.password, user.password);
        
        if (result) {
            const login = {
                sub: moment().unix(),
                idUser: user.id,
                iat: moment().add(1, "hour").unix()
            }
            
            const token = jwt.sign(login, 'secretkey');   
            
            return res.json({token});
        } else {
            return res.sendStatus(401);
        }

    } catch (error) {
        return res.sendStatus(500);
    }
    
}
