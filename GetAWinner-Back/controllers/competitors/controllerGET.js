const Competitors = require("../../models/competitorSchema")

exports.getAllCompetitors = async (req, res) => {

    try{
        const userLoggedID = req.decoded.id;                    
        const competitors = await Competitors.find({createdBy: userLoggedID}).exec();
        return res.status(200).json(competitors);
    } catch (error) {
        return res.sendStatus(500);
    }

}

exports.getCompetitorByID = async (req, res) => {

    try{
        const userLoggedID = req.decoded.id;              
        const competitors = await Competitors.find({createdBy: userLoggedID}).exec();
        const competitor = competitors.find(competitor => competitor.id === req.params.id);
        return res.status(200).json(competitor);
    } catch (error) {
        return res.sendStatus(500);
    }

}