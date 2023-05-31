import axios from 'axios';
const API_ROOT = process.env.NODE_ENV === "production" ?
  "spots/reviews" : `http://localhost:4000/spots/reviews/`

const instance = axios.create({
  baseURL: API_ROOT,
});

export class reviewAPI {

  // create: 
  // Input: {user: ObjectID(of user), spot: ObjectID(of spot), content: string, rating: number}
  // return {user: ObjectID(of user), spot: ObjectID(of spot), content: string, rating: number}
  // status: 200: success;
  static createReview = async (data) => {
    try {
      const response = await instance.post('', data);
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("axios create review error: " + e);
    }
  }

  // update: 
  // Input: {id: ObjectID(of review), content: string, rating: number}
  // return Origin Review
  // status: 200: success;
  static updateReview = async (data) => {
    try {
      const { id, content, rating } = data;
      const response = await instance.post(`/${id}`, { content, rating });
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("axios update review error: " + e);
    }
  }

  // remove: 
  // Input: {id: ObjectID(of review)}
  // return Origin Review
  // status: 200: success;
  static removeReview = async (id) => {
    try {
      const response = await instance.delete(`/${id}`);
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("axios delete review error: " + e);
    }
  }
}
