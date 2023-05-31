import { Table } from "react-bootstrap"

export function RestaurantTable({restaurants, handleDelete}){
    return(
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>name</th>
          <th>address</th>
          <th>rating</th>
        </tr>
      </thead>
      <tbody>
        {restaurants.map((restaurant)=>{
          return (<tr>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.address}</td>
                    <td>{restaurant.rating}</td>
                    <td><button onClick={() => {handleDelete(restaurant._id)}}>delete</button></td>
                  </tr>)
        })}
        </tbody>
      </Table>
    )
}
