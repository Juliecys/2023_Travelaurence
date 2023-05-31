import Review from "./src/models/Review";
import Spot from "./src/models/Spot";
import User from "./src/models/User";
import Schedule from "./src/models/Schedule";
import user from './data/user.json'
import spot from './data/spot.json'
import review from './data/review.json'

export default {
  genData: async() => {
    console.log("generating data!");
    await User.deleteMany();
    await Review.deleteMany();
    await Spot.deleteMany();
    await Schedule.deleteMany();
    await genUser();
    await genSpot();
    await genReview();
    await genSchedule();
    console.log("finish generating!")
  },

 
}

const genUser = async() => {
  console.log("generate users!");
  for (const u  of user) {
    const insert = new User(u);
    const pwd = insert.hashPwd();
    insert.password = pwd;
    await insert.save();
  }
}

const genSpot = async() => {
  console.log("generate spots!");
  await Spot.insertMany(spot);
}

const genReview = async() => {
  console.log("generate reviews!");
  const users = await User.find();
  const spots = await Spot.find();
  const ul = user.length;
  const sl = spots.length;
  for (let i = 0; i < review.length; i++) {
    review[i].user = users[i % ul]._id;
    review[i].spot = spots[i % sl]._id;
    const insert = new Review(review[i]);
    await insert.save();
  }
}

const genSchedule = async() => {
  console.log("generate schedule!")
  const users = await User.find();
  const spots = await Spot.find();
  const details = [
    [
      {spot: spots[0]._id, time: "9:00-12:00"},
      {spot: spots[1]._id, time: "12:00-15:00"},
      {spot: spots[2]._id, time: "15:00-18:00"}
    ],
    [
      {spot: spots[3]._id, time: "9:00-12:00"},
      {spot: spots[4]._id, time: "12:00-15:00"},
      {spot: spots[5]._id, time: "15:00-18:00"}],
    [
      {spot: spots[6]._id, time: "9:00-10:00"},
      {spot: spots[7]._id, time: "11:00-12:30"}],
    [
      {spot: spots[0]._id, time: "19:00-21:00"},
      {spot: spots[1]._id, time: "3:00-5:00"}]
  ]
  const nameList = [ "好玩的行程", "有趣的行程", "無聊的行程", "我的行程", "夢幻行程", "台灣自由行" ]
  const ul = user.length;
  const dl = details[0].length;
  for (let i = 0; i < nameList.length; i++){
    const content = {
      name: nameList[i],
      user: users[i % ul]._id,
      detail: details[i % dl]
    }
    let schedule = new Schedule(content);
    await schedule.save();
  }
}