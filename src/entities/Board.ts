import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";
import { Columns } from '../entities/Columns';

@Entity()
export class Board {
  
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @JoinColumn()
  columns!: Columns;
}