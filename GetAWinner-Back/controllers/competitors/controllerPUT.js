const Competitors = require("../../models/competitorSchema");

exports.updateCompetitor = async (req, res) => {

    try{
        const userLoggedID = req.decoded.id;

        const getCompetitor = await Competitors.findById(req.params.id).exec();

        const request = req.body;
    
        if(request._id || request._id === undefined){
            request._id = getCompetitor._id;
        }
    
        if(request.name === undefined){
            request.name = getCompetitor.name;
        }else{
            const findEqual = await Competitors.findOne({name: req.body.name, createdBy: userLoggedID}, "_id").exec();

            if(findEqual && findEqual.id !== req.params.id){             
                return res.status(409).send("COMPETITOR '"+req.body.name+"' ALREADY EXISTS");
            }
        }
    
        if(request.createdBy || request.createdBy === undefined){
            request.createdBy = getCompetitor.createdBy;
        }

        if(request.createdOn || request.createdOn === undefined){
            request.createdOn = getCompetitor.createdOn;
        }

        if(request.updatedAt || request.updatedAt === undefined){
            request.updatedAt = new Date();
        }
    
        const updatedCompetitor = await Competitors.findByIdAndUpdate(req.params.id, request);
        return res.status(200).json({oldUser: updatedCompetitor}); 
        
    } catch (error) {
        return res.sendStatus(500);
    }


}


