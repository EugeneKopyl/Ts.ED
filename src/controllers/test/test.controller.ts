import {Injectable, Inject, Controller} from "@tsed/di";
import {PathParams} from "@tsed/platform-params";
import {Get, Post} from '@tsed/schema';

import {OFFER_REPOSITORY, OfferRepository} from "../../repositories/OfferRepository";
import {Offers} from '../../entities/Offers';

@Controller("/offers")
export class OffersCtrl {
  @Inject(OFFER_REPOSITORY)
  protected repository: OFFER_REPOSITORY;
  private logger: any;

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