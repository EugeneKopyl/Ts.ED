import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OffersCategory } from "./OffersCategory";

@Entity({
  name: "Offers",
})
export class Offers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subTitle: string;

  @Column()
  description: string;

  @ManyToOne((type) => OffersCategory, (category) => category.offers)
  category: OffersCategory;
}
