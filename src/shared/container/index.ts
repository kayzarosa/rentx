import { container } from "tsyringe";

import "@shared/container/providers";

import UserRepository from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import UsersTokenRepository from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import IUserRepository from "@modules/accounts/repositories/IUserRepository";
import IUsersTokenRepository from "@modules/accounts/repositories/IUsersTokenRepository";
import CarImagesRepository from "@modules/cars/infra/typeorm/repositories/CarImagesRepository";
import CarsRepository from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import CategoriesRepository from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import SpecificationsRepository from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import ICarImagesRepository from "@modules/cars/repositories/ICarImagesRepository";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import ICategoriesRepository from "@modules/cars/repositories/ICategoriesRepository";
import ISpecificationsRepository from "@modules/cars/repositories/ISpecificationsRepository";
import RentalsRepository from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarImagesRepository>(
  "CarImagesRepository",
  CarImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IUsersTokenRepository>(
  "UsersTokenRepository",
  UsersTokenRepository
);
