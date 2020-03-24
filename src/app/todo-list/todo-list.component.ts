import { Component, EventEmitter, Input, Output } from '@angular/core'
import { TodoDataService } from '../todo-data.service'
import { AuthenticationService } from '../authentication.service'
import { Todo } from '../todo'
import { User } from '../user'

@Component(
  {
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
    providers: [TodoDataService]
  }
)
export class TodoListComponent {

  todos: Todo[] = []
  users: User[] = []
  done = null
  edited_todo:Todo;
  email:string
  filterState={
    all:{},
    my_todos:{}
  }

  // @Output()
  // remove: EventEmitter<Todo> = new EventEmitter();

  // @Output()
  // toggleComplete: EventEmitter<Todo> = new EventEmitter();

  constructor(
    private todoDataService: TodoDataService,
    protected authenticationService: AuthenticationService
  ) {}

  // onToggleTodoComplete(todo: Todo) {
  //   this.toggleComplete.emit(todo);
  // }

  // onRemoveTodo(todo: Todo) {
  //   this.remove.emit(todo);
  // }


  public ngOnInit() {
    this.email = this.authenticationService.currentUserValue.email;
      this.loadTodos()

      this.todoDataService
      .getUsers()
      .subscribe(
        (users) => {
          this.users = users;
        }
      );
  }

  loadTodos() {
    this.todoDataService
      .getAllTodos()
      .subscribe(
        (todos) => {
          this.filterState={
            all: {'btn-dark':true, 'btn-secondary':false},
            my_todos: {'btn-dark':false, 'btn-secondary':true}
          }
          this.todos = todos;
        }
      );
  }

  filterByStatus() {

  }

  filterMyTodos() {
    this.todos = this.todos.filter((t) => t.user == this.email);
    this.filterState={
      all: {'btn-dark':false, 'btn-secondary':true},
      my_todos: {'btn-dark':true, 'btn-secondary':false}
    }
  }

  onAddTodo(todo) {

    if(todo._id){
      this.todoDataService
      .updateTodo(todo)
      .subscribe(
        (editedTodo) => {
          //this.todos = this.todos.concat(newTodo);
          this.todos = this.todos.map(item => {
            if(item._id==editedTodo._id) return editedTodo;
            else return item;
          });
          console.log(editedTodo)
        }
      );
    }else{
      this.todoDataService
      .addTodo(todo)
      .subscribe(
        (newTodo) => {
          this.todos = this.todos.concat(newTodo);
        }
      );
    }


  }

  onToggleTodoComplete(todo) {
    this.todoDataService
      .toggleTodoComplete(todo)
      .subscribe(
        (updatedTodo) => {
          todo = updatedTodo;
        }
      );
  }

  onRemoveTodo(todo) {
    //console.log(todo)
    this.todoDataService
      .deleteTodoById(todo._id)
      .subscribe(
        (_) => {
          this.todos = this.todos.filter((t) => t._id !== todo._id);
        }
      );
  }

  onEditTodo(todo) {
    this.edited_todo = todo
  }

}


