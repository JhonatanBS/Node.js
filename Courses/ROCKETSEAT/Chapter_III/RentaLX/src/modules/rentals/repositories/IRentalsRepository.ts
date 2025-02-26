import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { ICreateRentalDTO } from "../dto/ICreateRentalDTO";

export interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
}
