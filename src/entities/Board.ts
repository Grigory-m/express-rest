import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Columns } from './Columns';

@Entity()
export class Board {
  
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('json', { nullable: true })
  columns!: Columns[];   
}