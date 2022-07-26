import { Controller } from "@tsed/di";
import { PathParams } from "@tsed/platform-params";
import { Get } from "@tsed/schema";
import { Offers } from "../../entities/Offers";
import { OffersService } from "../../services/offers.service";

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
}
