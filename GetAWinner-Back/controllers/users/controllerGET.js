const Users = require("../../models/usersSchema")

exports.getAllUsers = async (req, res) => {

    try{
        const tokenParams = req.decoded;

        if(tokenParams.role === 1){
            const response = await Users.find({}).exec();
            return res.status(200).send(response);
        }else{
            return res.status(401).send("ADMINS ONLY");
        }        
        
    } catch (error) {
        
        return res.sendStatus(500);
    }
}

exports.getUserByID = async (req, res) => {

    try{
        const tokenParams = req.decoded;

        if(tokenParams.role !== 1 && tokenParams.id === req.params.id){
            const response = await Users.findById(req.params.id).exec();
            return res.status(200).send(response);
        }

        if(tokenParams.role === 1){
            const response = await Users.findById(req.params.id).exec();
            return res.status(200).send(response);
        }

        return res.status(401).send("ADMINS OR USER-OWNER ONLY");    
        
    } catch (error) {
        return res.sendStatus(500);
    }
}

exports.getUserData = async (req, res) => {

    try{
        const tokenParams = req.decoded;
        return res.status(200).json({idUser: tokenParams.id});   
        
    } catch (error) {
        return res.sendStatus(500);
    }

}