import { OfferRepository } from "../repositories/OfferRepository";

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
}
