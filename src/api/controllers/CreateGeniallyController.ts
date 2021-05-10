import { Response, Request } from "express";
import { CreateGeniallyService } from "../../contexts/core/genially/application/CreateGeniallyService";
import httpStatus from "http-status";
import { GeniallyNameLengthInvalid } from "../../contexts/core/genially/domain/GeniallyNameLengthInvalid";
import { GeniallyDescriptionTooLong } from "../../contexts/core/genially/domain/GeniallyDescriptionTooLong";
import { GeniallyNameEmpty } from "../../contexts/core/genially/domain/GeniallyNameEmpty";
import { Controller } from "./Controller";

export class CreateGeniallyController implements Controller {
  constructor(private createGeniallyService: CreateGeniallyService) {}

  async run (req: Request, res: Response) {
    const request = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
    };
  
    try {
      await this.createGeniallyService.execute(request);
      res.status(httpStatus.CREATED).send();
    } catch(error) {
      this.handleError(res, error);
    }
  };
  
  private handleError(res: Response, error: Error)
  {
    if(error instanceof GeniallyNameLengthInvalid ||
      error instanceof GeniallyDescriptionTooLong ||
      error instanceof GeniallyNameEmpty) {
        res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
    } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: "Something went wrong trying to create the genially" });
    }
  }
  
} 