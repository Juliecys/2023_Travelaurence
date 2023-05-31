import { Router } from "express";
import ReviewController from "../controller/ReviewController";
import SpotController from "../controller/SpotController";

const SpotRouter = Router();

SpotRouter.post("/reviews/", ReviewController.create);
SpotRouter.post("/reviews/:id", ReviewController.update);
SpotRouter.delete("/reviews/:id", ReviewController.remove);

SpotRouter.get("/", SpotController.indexAll);
SpotRouter.post("/", SpotController.create);
SpotRouter.get("/search", SpotController.getSearch);
SpotRouter.get("/:id", SpotController.indexOne);
SpotRouter.post("/:id", SpotController.update);
SpotRouter.delete("/:id", SpotController.remove);



export default SpotRouter;