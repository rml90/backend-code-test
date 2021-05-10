import { Response, Request } from "express";
import { DeleteGeniallyService } from "../../contexts/core/genially/application/DeleteGeniallyService";
import httpStatus from "http-status";
import { Controller } from "./Controller";
import { GeniallyNotExist } from "../../contexts/core/genially/domain/GeniallyNotExist";

export class DeleteGeniallyController implements Controller {
  constructor(private deleteGeniallyService: DeleteGeniallyService) { }

  async run(req: Request, res: Response) {
    const id = req.params.id;
    
    try {
      await this.deleteGeniallyService.execute(id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: Error) {
    if (error instanceof GeniallyNotExist) {
      res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Something went wrong trying to delete the genially" });
    }
  }

}