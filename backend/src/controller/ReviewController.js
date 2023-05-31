import User from '../models/User'
import Review from '../models/Review';

export default{
  create: async (req, res) => {
    try {
      const newReview = new Review(req.body);
      const createdReview = await newReview.save();
      const result = await Review.findById(createdReview._id).populate({path: "user", select: "name"})
      res.send(result).status(200);
    } catch(e) {
      console.log("Create review error: " + e)
      res.status(500).send();
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updateReview = await Review.findOneAndUpdate({ _id: id }, req.body);
      res.send(updateReview).status(200); //return: query
    } catch(e) {
      console.log("Update review error: " + e);
      res.status(500).send();
    }
  },
  
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const removeReview = await Review.findOneAndRemove({ _id: id });
      res.send(removeReview).status(200);
    } catch(e) {
      console.log("remove review error: " + e);
      res.status(500).send();
    }
  },
}