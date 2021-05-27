import { v4 } from 'uuid';

class Board {
  id: string;

  title: string;

  columns: never[];

  constructor({
    id = v4(),
    title = 'BOARD',
    columns = []    
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
