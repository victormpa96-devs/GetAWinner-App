const Users = require("../../models/usersSchema");

exports.deletUserByID = async (req, res) => {

    try{
        const {id, role} = req.decoded;

        if(role === 1 || id === req.params.id){
            await Users.findByIdAndDelete(req.params.id).exec();
            return res.status(200).send("USER DELETED");
        } else{
            return res.status(401).send("ADMINS OR USER-OWNER ONLY");
        }        
        
    } catch (error) {
        return res.sendStatus(500);
    }

}

exports.deleteAllUsers = async (req, res) => {
    
    try{
        const {role} = req.decoded;

        if(role === 1){
            await Users.deleteMany({role: 0}).exec();
            return res.status(200).send("ALL USERS DELETED");
        }else{
            return res.status(401).send("ADMINS ONLY");
        }      
        
    } catch (error) {
        return res.sendStatus(500);
    }

}
