import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:4000/`,
});

export class restaurantAPI {

  static getRestaurants = async() => {
    try {
      const response = await instance.get('/restaurants');
      // console.log(response);
      return response.data;
    } catch(e){
      console.error(e);
      throw new Error("axios index error: " + e);
    }
    
  }

  static deleteRestaurant = async(id) => {
    try{
      const response = await instance.delete(`/restaurant/${id}`);
      return response.status
    }catch(e){
      console.log(e);
      throw new Error('axios delete error' + e);
    }
  }

  static createRestaurant = async(data) => {
    try{
      const response = await instance.post(`/restaurant/`, data);
      return response.status
    }catch(e){
      console.log(e);
      throw new Error('axios create error' + e);
    }
  }
}
