import Restaurant from '../models/Restaurant'

export default{
  index: async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      console.log(restaurants);
      res.send(restaurants);
    } catch (e) {
      throw new Error("indexing err" + e);
    }
  },
 
  create: async (req, res) => {
      try {
        const newRestaurant = await new Restaurant({name: req.body.name, address: req.body.address, rating: req.body.rating});
        const createdRestaurant = await newRestaurant.save();
        res.send(createdRestaurant).status(200);
      } catch(e) {
        throw new Error("ScoreCard update error: " + e);
      }

      // res.status(200).send();
    },

  delete: async (req, res) => {
    try {
      await Restaurant.deleteOne({ _id: req.params.id});
    } catch (e) { 
      throw new Error("Database deletion failed"); 
    }

    res.status(200).send();
  },

  
}