const Competitors = require("../../models/competitorSchema");

exports.postCompetitor = async (req, res) => {

    try{
        const userLoggedID = req.decoded.id;
        
        const isRepeated = await Competitors.findOne({name: req.body.name, createdBy: userLoggedID}, "name");

        if(isRepeated){
            return res.status(409).send("NAME ALREADY EXISTS");
        }

        const newUser = {
            name: req.body.name,
            createdOn: new Date(),
            createdBy: userLoggedID
        }
    
        const user = await Competitors.create(newUser);
        return res.status(201).json(user);

    } catch (error) {
        return res.sendStatus(500);
    }
    
}

