import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Columns {
  
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;
}