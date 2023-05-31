import { Router } from "express";
import ScheduleController from "../controller/ScheduleController";

const ScheduleRouter = Router();
ScheduleRouter.post("/", ScheduleController.create);
ScheduleRouter.post("/:id", ScheduleController.update);
ScheduleRouter.delete("/:id", ScheduleController.remove);
ScheduleRouter.get("/:id", ScheduleController.indexOne);

export default ScheduleRouter