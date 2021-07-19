import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Columns } from './column.entity';

@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('json', { nullable: true })
  columns!: Columns[];
}
