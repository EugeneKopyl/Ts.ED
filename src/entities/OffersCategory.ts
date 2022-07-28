import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Offers } from "./Offers";

@Entity({
  name: "OffersCategory",
})
export class OffersCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Offers, (offers) => offers.category)
  offers: Offers[];
}
