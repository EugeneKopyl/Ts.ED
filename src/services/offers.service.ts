import { OfferRepository } from "../repositories/OfferRepository";
import { Offers } from "../entities/Offers";
import { MssqlDataSource } from "../datasources/mssql.datasource";

export class OffersService {
  async getAll() {
    const offers = OfferRepository.createQueryBuilder("offers").getMany();
    return offers;
  }

  async findById(id: string) {
    const offer = OfferRepository.createQueryBuilder("offer")
      .where("offer.id = :id", { id: id })
      .getOne();
    return offer;
  }

  async updateById(id: string, offer: Offers) {
    await MssqlDataSource.createQueryBuilder()
      .update(Offers)
      .set(offer)
      .where("id = :id", { id: id })
      .execute();
    return offer;
  }

  async deleteById(id: string) {
    await MssqlDataSource.createQueryBuilder()
      .delete()
      .from(Offers)
      .where("id = :id", { id: id })
      .execute();
    return "deleted";
  }
  async create(offer: Offers) {
    await MssqlDataSource.createQueryBuilder()
      .insert()
      .into(Offers)
      .values(offer)
      .execute();
    return offer;
  }
}
