import { Router } from "express";
import UserController from "../controller/UserController";

const UserRouter = Router();
UserRouter.post("/signUp", UserController.signUp);
UserRouter.post("/signIn", UserController.signIn);
UserRouter.post("/:id/", UserController.updateUserWishlist);
UserRouter.get("/:id/", UserController.index)
export default UserRouter;