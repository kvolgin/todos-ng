export class Todo {
  _id?: number;
  title = '';
  user:string;
  todo = '';
  done = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
