import axios from 'axios';
const API_ROOT = process.env.NODE_ENV === "production" ?
  "users" : `http://localhost:4000/users/`

const instance = axios.create({
  baseURL: API_ROOT,
});

export class userAPI {

  // signIn: 
  // Input: {name: string, password: string, email: string}
  // return {name: string, password: string, email: string}
  // status: 200: success; 401: already exist name/email
  static signUpNewUser = async(data) => {
    try {
      const response = await instance.post('/signUp', data);
      return response;
    } catch(e){
      console.error(e.response.data);
      return e.response
    } 
  }

  // signIn: 
  // Input: {name: string, password: string, email: string}
  // return true: correct pwd; false: wrong pwd
  // status: 200: success; 402: not exist user(wrong email or name)
  static signInCheck = async(data) => {
    try {
      const response = await instance.post('/signIn', data);
      return response;
    } catch(e){
      console.error(e.response.data);
      return e.response
    } 
  }

  static indexOneUser = async(id) => {
    try {
      const response = await instance.get(`/${id}/`);
      return response;
    } catch(e){
      console.error(e.response.data);
      return e.response;
    } 
  }

  // data: {id: user_id, wishlist:[spot1.id, spot2.id]}
  static updateUserWishlist = async(data) => {
    try {
      const {id, wishlist} = data;
      const response = await instance.post(`/${id}/`, {wishlist: wishlist});
      return response;
    } catch(e){
      console.error(e.response.data);
      return e.response;
    } 
  }
}
