import { Columns } from '../column.entity';

export class UpdateBoardDto {
  title!: string;

  columns!: Columns[];
}
