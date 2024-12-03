const Users = require("../../models/usersSchema");
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.updateUser = async (req, res) => {

    try{
        const {id, role} = req.decoded;

        const getUser = await Users.findById(req.params.id).exec();

        const request = req.body;
    
        if(request._id || request._id === undefined){
            request._id = getUser._id;
        }
    
        if(request.username === undefined){
            request.username = getUser.username;
        }else{
            const findEqual = await Users.findOne({username: req.body.username}, "_id").exec();

            if(findEqual && role === 1 && findEqual.id !== req.params.id){
                return res.status(409).send("USERNAME ALREADY EXISTS");
            }

            if(findEqual && role === 0 && findEqual.id !== req.params.id){
                return res.status(401).send("ADMINS OR USER-OWNER ONLY");
            }

            if(!findEqual && role === 0 && id !== req.params.id){                
                return res.status(401).send("ADMINS OR USER-OWNER ONLY");
            }
        }
    
        if(request.password === undefined){
            request.password = getUser.password;
        }else{
            request.password = await bcrypt.hash(req.body.password, saltRounds);
        }

        if(request.role === undefined){
            request.role = getUser.role;
        }else if(role !== 1){
            return res.status(401).send("FORBIDDEN PARAM (ROLE)");
        }

        if(request.createdOn || request.createdOn === undefined){
            request.createdOn = getUser.createdOn;
        }

        if(request.updatedAt || request.updatedAt === undefined){
            request.updatedAt = new Date();
        }
    
        const updatedUser = await Users.findByIdAndUpdate(req.params.id, request, {new: true});
        return res.status(200).json({newUserData: updatedUser});
        
    } catch (error) {
        return res.sendStatus(500);
    }


}


