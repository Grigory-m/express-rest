import { v4 } from 'uuid';

class Column {
  id: string;
  title: string;
  order: number;
  constructor({
    id = v4(),
    title = 'COLUMN',
    order = 0    
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export default Column;
