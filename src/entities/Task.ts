import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
  
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column({ type: 'varchar', nullable: true })
  userId!: string | null;

  @Column()
  boardId!: string;

  @Column({ type: 'varchar', nullable: true })
  columnId!: string;
}