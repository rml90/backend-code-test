import { Response, Request } from "express";
import httpStatus from "http-status";
import { Controller } from "./Controller";
import { RenameGeniallyService } from "../../contexts/core/genially/application/RenameGeniallyService";
import { GeniallyNotExist } from "../../contexts/core/genially/domain/GeniallyNotExist";
import { GeniallyNameLengthInvalid } from "../../contexts/core/genially/domain/GeniallyNameLengthInvalid";

export class RenameGeniallyController implements Controller {
  constructor(private renameGeniallyService: RenameGeniallyService) { }

  async run(req: Request, res: Response) {
    const id = req.params.id;
    const name = req.body.name;

    try {
      await this.renameGeniallyService.execute({ id, name });
      res.status(httpStatus.OK).send();
    } catch (error) {
      this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: Error) {
    if (error instanceof GeniallyNotExist ||
      error instanceof GeniallyNameLengthInvalid) {
      res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Something went wrong trying to rename the genially" });
    }
  }
}