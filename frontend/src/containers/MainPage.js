import './MainPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { restaurantAPI } from '../api/restaurant';
import {useState,  useEffect } from "react"
import RestaurantForm from "../components/RestaurantForm"
import { RestaurantTable } from '../components/RestaurantTable';

function MainPage() {
  const [restaurants, setRestaurant] = useState([]);

  const fetchData = async() => {
    const data = await restaurantAPI.getRestaurants();
    // console.log("data"+{data})
    setRestaurant([...data]);
    console.log(restaurants);
  }

  const handleDelete = async(id) => {
    const res = await restaurantAPI.deleteRestaurant(id);
    console.log(res);
    fetchData();
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {name: e.target[0].value,
                  address: e.target[1].value,
                  rating: e.target[2].value}
      const response = await restaurantAPI.createRestaurant(data);
      console.log(response);
      fetchData();
  }

  useEffect(() => {
    fetchData();
  },[])

  const css = { 
    margin: "auto",
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }

  return (
    <div style={css}>
      <RestaurantTable restaurants={restaurants} handleDelete={handleDelete}/>
      <RestaurantForm handleSubmit={handleSubmit}/>
    </div>
  );
}

export default MainPage;
