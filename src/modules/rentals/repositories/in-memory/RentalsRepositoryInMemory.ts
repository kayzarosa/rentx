import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";

import IRentalsRepository from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create(dataRental: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    dataRental.start_date = new Date();

    Object.assign(rental, dataRental);

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentalsUser = this.rentals.filter(
      (rental) => rental.user_id === user_id
    );

    return rentalsUser;
  }
}

export default RentalsRepositoryInMemory;
