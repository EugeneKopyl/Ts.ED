import { registerProvider } from "@tsed/di";
import { Offers } from "../entities/Offers";
import { MssqlDataSource } from "../datasources/mssql.datasource";

export const OfferRepository = MssqlDataSource.getRepository(Offers);
export const OFFER_REPOSITORY = Symbol.for("OfferRepository");
export type OFFER_REPOSITORY = typeof OfferRepository;

registerProvider({
  provide: OFFER_REPOSITORY,
  useValue: OfferRepository,
});
