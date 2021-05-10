import { FindGeniallyService } from "./../contexts/core/genially/application/FindGeniallyService";
import { Express, Request, Response } from "express";
import { InMemoryGeniallyRepository } from "../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import { CreateGeniallyService } from "../contexts/core/genially/application/CreateGeniallyService";
import { DeleteGeniallyService } from "../contexts/core/genially/application/DeleteGeniallyService";
import { RenameGeniallyService } from "../contexts/core/genially/application/RenameGeniallyService";
import * as healthController from "./controllers/health";
import { CreateGeniallyController } from "./controllers/CreateGeniallyController";
import { DeleteGeniallyController } from "./controllers/DeleteGeniallyController";
import { RenameGeniallyController } from "./controllers/RenameGeniallyController";

export const registerRoutes = (app: Express) => {
  const geniallyRepository = new InMemoryGeniallyRepository();
  
  const createGeniallyService = new CreateGeniallyService(geniallyRepository);
  const findGeniallyService = new FindGeniallyService(geniallyRepository);
  const deleteGeniallyService = new DeleteGeniallyService(geniallyRepository, findGeniallyService);
  const renameGeniallyService = new RenameGeniallyService(geniallyRepository, findGeniallyService);

  const createGeniallyController = new CreateGeniallyController(createGeniallyService);
  const deleteGeniallyController = new DeleteGeniallyController(deleteGeniallyService);
  const renameGeniallyController = new RenameGeniallyController(renameGeniallyService);
  
  app.get("/", healthController.check);
  app.post("/genially", (req: Request, res: Response) => createGeniallyController.run(req, res));
  app.delete("/genially/:id", (req: Request, res: Response) => deleteGeniallyController.run(req, res));
  app.patch("/genially/:id", (req: Request, res: Response) => renameGeniallyController.run(req, res));
};