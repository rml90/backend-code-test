import { Express, Request, Response } from "express";
import container from "./config/dependency-injection";
import * as healthController from "./controllers/health";

export const registerRoutes = (app: Express) => {
  const createGeniallyController = container.get("Api.Controller.CreateGeniallyController");
  const deleteGeniallyController = container.get("Api.Controller.DeleteGeniallyController");
  const renameGeniallyController = container.get("Api.Controller.RenameGeniallyController");
  
  app.get("/", healthController.check);
  app.post("/genially", (req: Request, res: Response) => createGeniallyController.run(req, res));
  app.delete("/genially/:id", (req: Request, res: Response) => deleteGeniallyController.run(req, res));
  app.patch("/genially/:id", (req: Request, res: Response) => renameGeniallyController.run(req, res));
};