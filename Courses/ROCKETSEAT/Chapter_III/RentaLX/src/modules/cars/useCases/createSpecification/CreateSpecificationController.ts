import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateEspecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateEspecificationUseCase
    );

    await createSpecificationUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
