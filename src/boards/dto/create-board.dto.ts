import { Columns } from '../column.entity';

export class CreateBoardDto {
  title!: string;

  columns!: Columns[];
}
