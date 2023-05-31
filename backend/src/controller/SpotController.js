import Spot from '../models/Spot';

export default{
  indexAll: async (req, res) => {
    try {
      const spots = await Spot.find().populate({path: "review", populate: {path: "user", select: "name"}});
      res.send(spots).status(200);
    } catch(e) {
      console.log("index all spots error: " + e);
      res.status(500).send();
    }
  },
  indexOne: async (req, res) => {
    try {
      const { id } = req.params;
      const spot = await Spot.findById(id).populate({path: "review", populate: {path: "user", select: "name"}});
      res.send(spot).status(200);
    } catch(e) {
      console.log("index spot error: " + e);
      res.status(500).send();
    }
  },

  getSearch: async (req, res) => {
    try {
      const filter = req.query.filter;
      const searchResult = await Spot.find({ $or:[
                                            {name: { "$regex": filter, "$options": "i" }},
                                            {location: { "$regex": filter, "$options": "i" }}]
      }).populate({path: "review", populate: {path: "user", select: "name"}});
      res.status(200).send(searchResult);
    } catch(e) {
      console.log("index spot error: " + e);
      res.status(500).send();
    }
  },

  create: async (req, res) => {
    try {
      const newSpot = new Spot(req.body);
      const createdSpot = await newSpot.save();        
      res.send(createdSpot).status(200);
    } catch(e) {
      console.log("Create spot error: " + e);
      res.status(500).send();
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updateSpot = await Spot.findOneAndUpdate({ _id: id }, req.body);
      res.send(updateSpot).status(200); //return: query
    } catch(e) {
      console.log("Update spot error: " + e);
      res.status(500).send();
    }
  },
  
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const removeSpot = await Spot.findOneAndRemove({ _id: id });
      res.send(removeSpot).status(200);
    } catch(e) {
      console.log("remove spot error: " + e);
      res.status(500).send();
    }
  },
}