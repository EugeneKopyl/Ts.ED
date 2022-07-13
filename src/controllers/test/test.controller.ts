import {Controller} from "@tsed/di";
import {PathParams} from "@tsed/platform-params";
import {Get} from '@tsed/schema';

import {OfferRepository} from "../../repositories/OfferRepository";

@Controller("/offers")
export class OffersCtrl {

  @Get("/")
  async getAll() {
    const offers = OfferRepository
      .createQueryBuilder("offers")
      .getMany()
    return offers
  }

  @Get("/:id")
  async findOne(@PathParams("id") id: string) {
    const offer = OfferRepository
      .createQueryBuilder("offer")
      .where("offer.id = :id", { id: id })
      .getOne()
    return offer;
  }}