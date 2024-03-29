import { inject, injectable } from "tsyringe";

import ISpecificationsRepository from "@modules/cars/repositories/ISpecificationsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationalreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationalreadyExists) {
      throw new AppError("Specification already exists!");
    }

    await this.specificationsRepository.create({ name, description });
  }
}
