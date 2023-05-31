import { Router } from "express";
import restaurantController from "../controller/RestaurantController";

const RestaurantRouter = Router();
RestaurantRouter.delete("/restaurant/:id", restaurantController.delete);
RestaurantRouter.post("/restaurant", restaurantController.create);
RestaurantRouter.get("/restaurants", restaurantController.index);

export default RestaurantRouter;