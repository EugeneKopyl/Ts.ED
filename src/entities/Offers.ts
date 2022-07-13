import {BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({
  name: "Offers"
})
export class Offers {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  subTitle: string

  @Column()
  description: string

  @CreateDateColumn()
  createdDate: Date
}