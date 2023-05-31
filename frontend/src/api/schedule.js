import axios from 'axios';
const API_ROOT = process.env.NODE_ENV === "production" ?
  "schedules" : `http://localhost:4000/schedules/`

const instance = axios.create({
  baseURL: API_ROOT,
});

export class scheduleAPI {

  static indexOne = async(id) => {
    try {
      const response = await instance.get(`/${id}/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("axios index schedule error: " + error);
    }
  }
  // create: 
  // Input: {"name": "行程一", "user": "63af1b9aa2648aba52f0a5fd", "publicToAll": Boolean(is default true), "detail": [{"time": "9:00-15:00", "spot": "63b277cadadddead5d39f677"}] }
  // return {"name": "行程一", "user": "63af1b9aa2648aba52f0a5fd", "detail": [{"time": "9:00-15:00", "spot": "63b277cadadddead5d39f677"}] }
  // status: 200: success;
  static createSchedule = async(data) => {
    try {
      const response = await instance.post('', data);
      return response.data;
    } catch(e){
      console.error(e);
      throw new Error("axios create schedule error: " + e);
    } 
  }

  // update: 
  // Input: {"name": "行程一", "user": "63af1b9aa2648aba52f0a5fd", "publicToAll": Boolean(is default true), "detail": [{"time": "9:00-15:00", "spot": "63b277cadadddead5d39f677"}] }
  // return Origin schedule
  // status: 200: success;
  static updateSchedule = async(data) => {
    try {
      const {id, name, publicToAll, detail} = data;
      const response = await instance.post(`/${id}`, {name, publicToAll, detail});
      return response.data;
    } catch(e){
      console.error(e);
      throw new Error("axios update schedule error: " + e);
    } 
  }

  // remove: 
  // Input: {id: ObjectID(of schedule)}
  // return Origin schedule
  // status: 200: success;
  static removeReview = async(id) => {
    try {
      const response = await instance.delete(`/${id}`);
      return response.data;
    } catch(e){
      console.error(e);
      throw new Error("axios delete schedule error: " + e);
    } 
  }
}
