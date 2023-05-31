import Schedule from "../models/Schedule";

export default{
  indexOne: async (req, res) => {
    try {
      const {id} = req.params
      console.log(id)
      const schedule = await Schedule.findById(id).populate({path: "detail.spot", select: "name"});
      res.send(schedule).status(200);
    } catch(e) {
      res.status(500).send();
      console.log("index Schedule error: " + e);
    }
  },
  create: async (req, res) => {
    try {
      const newSchedule = new Schedule(req.body);
      const createdSchedule = await newSchedule.save();        
      res.send(createdSchedule).status(200);
    } catch(e) {
      res.status(500).send();
      console.log("Create Schedule error: " + e);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updateSchedule = await Schedule.findOneAndUpdate({ _id: id }, req.body);
      console.log(updateSchedule)
      res.send(updateSchedule).status(200); //return: query
    } catch(e) {
      res.status(500).send();
      console.log("Update Schedule error: " + e);
    }
  },
  
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const removeSchedule = await Schedule.findOneAndRemove({ id });
      res.send(removeSchedule).status(200);
    } catch(e) {
      res.status(500).send();
      console.log("remove Schedule error: " + e);
    }
  },
}