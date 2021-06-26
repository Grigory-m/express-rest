import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'columns' })
export class Columns {
  
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;
}