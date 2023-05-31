import User from '../models/User'

export default{
  signUp: async (req, res) => {
    try {
      let user = await User.findOne({name: req.body.name, email: req.body.email});
      if(user){
        res.status(401).send("exist user!");
      }else{
        const newUser = new User(req.body);
        const hashPwd = newUser.hashPwd();
        newUser.password = hashPwd;
        const createdUser = await newUser.save();
        res.send(createdUser).status(200);
      }                           
    } catch(e) {
      console.log("SignUp error: " + e);
      res.status(500).send();
    }
  },

  signIn: async(req, res) => {
    try {
      let user = await User.findOne({name: req.body.name,email: req.body.email});
      if(!user){
        res.status(402).send("user not exist!");
      }else{
        const valid = await user.validatePassword(req.body.password);
        if(valid){
          res.status(200).send(user);
        }
        else{
          res.status(403).send("validation fail");
        }
      }                   
    } catch(e) {
      console.log("SignIn error: " + e);
      res.status(500).send();
    }
  },

  index: async(req, res) => {
    try {
      const {id} = req.params
      const userWithSchedules = await User.findById(id, "name email")
                                          .populate({path: "schedule"})
                                          .populate({path: "wishlist", select: "name"});
      res.send(userWithSchedules).status(200);
    } catch (e) {
      console.log(e)
      res.status(500).send();
    }
  },

  updateUserWishlist: async(req, res) => {
    try {
      const {id} = req.params
      const wishlist = req.body.wishlist
      const user = await User.findById(id)
      user.wishlist = wishlist;
      await user.save();
      res.send(user).status(200);
    } catch (e) {
      console.log(e)
      res.status(500).send();
    }
  },

  
}