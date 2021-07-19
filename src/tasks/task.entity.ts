import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tasks' })
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

  @Column({ type: 'varchar' })
  boardId!: string;

  @Column({ type: 'varchar', nullable: true })
  columnId!: string;
}
