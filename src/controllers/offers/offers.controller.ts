import { Controller } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Delete, Get, Post, Put } from "@tsed/schema";
import { Offers } from "../../entities/Offers";
import { OffersService } from "../../services/offers.service";
import bodyParser from "body-parser";

@Controller("/offers")
export class OffersCtrl {
  constructor(private offersService: OffersService) {}

  @Get("/")
  getList(): Promise<Offers[]> {
    return this.offersService.getAll();
  }

  @Get("/:id")
  getById(@PathParams("id") id: string): Promise<Offers | null> {
    return this.offersService.findById(id);
  }

  @Put("/:id")
  updateById(
    @PathParams("id") id: string,
    @BodyParams() offer: Offers
  ): Promise<Offers> {
    return this.offersService.updateById(id, offer);
  }

  @Post("/")
  create(@BodyParams() offer: Offers): Promise<Offers> {
    return this.offersService.create(offer);
  }

  @Delete("/:id")
  deleteById(@PathParams("id") id: string): Promise<string> {
    return this.offersService.deleteById(id);
  }
}
