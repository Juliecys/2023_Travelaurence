import axios from 'axios';
const API_ROOT = process.env.NODE_ENV === "production" ?
  "spots" : `http://localhost:4000/spots/`

const instance = axios.create({
  baseURL: API_ROOT,
});

export class spotAPI {
  
  static getSearch = async(filter) => {
    try {
      const response = await instance.get(`/search`, {params: {filter}});
      return response.data;
    } catch(e){
      console.error(e);
      throw new Error("axios index spot error: " + e);
    } 
  }

  static indexOneSpot = async(id) => {
    try {
      const response = await instance.get(`/${id}/`);
      return response.data;
    } catch(e){
      console.error(e);
      throw new Error("axios index spot error: " + e);
    } 
  }

  static indexAllSpots = async() => {
    try {
      const response = await instance.get();
      return response.data;
    } catch(e){
      console.error(e);
      throw new Error("axios index all spots error: " + e);
    } 
  }

  // create: 
  // Input: {"name": "麥當勞", "type": "restaurant", "location": "Taipei", "phone": "0912345678" }
  // return {"name": "麥當勞", "type": "restaurant", "location": "Taipei", "phone": "0912345678" }
  // status: 200: success;
  static createSpot = async(data) => {
    try {
      const response = await instance.post('', data);
      return response.data;
    } catch(e){
      console.error(e);
      throw new Error("axios create spot error: " + e);
    } 
  }

  // update: 
  // Input: {"id": ObjectId of spot, "name": "麥當勞", "type": "restaurant", "location": "Taipei", "phone": "0912345678" }
  // return Origin Spot
  // status: 200: success;
  static updateSpot = async(data) => {
    try {
      const {id, name, type, location, phone} = data;
      const response = await instance.post(`/${id}/`, {name, type, location, phone});
      return response.data;
    } catch(e){
      console.error(e);
      throw new Error("axios update review error: " + e);
    } 
  }

  // remove: 
  // Input: {id: ObjectID(of spot)}
  // return Origin spot
  // status: 200: success;
  static removeSpot = async(id) => {
    try {
      const response = await instance.delete(`/${id}/`);
      return response.data;
    } catch(e){
      console.error(e);
      throw new Error("axios remove spot error: " + e);
    } 
  }

}
