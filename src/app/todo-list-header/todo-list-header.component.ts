import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service'
import { Todo } from '../todo';
import { User } from '../user';

@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.scss']
})
export class TodoListHeaderComponent implements OnChanges {
  todoForm: FormGroup;
  newTodo: Todo = new Todo();
  user: string = 'Choose user from list';
  editMode = false
  id = null

  @Output()
  add: EventEmitter<Todo> = new EventEmitter();

  @Input() todo: Todo
  @Input() users: User[]

  constructor(
    private formBuilder: FormBuilder,
    protected authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
        todo: ['', Validators.required],
        user: ['', Validators.required]
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    // Input change handling logic goes here 
    
    if(changes.todo && changes.todo.currentValue){
      console.log(changes.todo.currentValue) 
      this.todoForm.get('todo').setValue(changes.todo.currentValue.todo)
      this.todoForm.get('user').setValue(changes.todo.currentValue.user) 
      this.editMode = true
      this.id = changes.todo.currentValue._id
    }
  }

  assignToMe() {
    this.todoForm.get('user').setValue(this.authenticationService.currentUserValue.email) 
  }

  reset(){
    this.editMode =false
    this.todoForm.get('todo').setValue('')
      this.todoForm.get('user').setValue(this.user) 
      this.newTodo = new Todo();
  }

  get f() { return this.todoForm.controls; }
  
  //changes.todo.currentValue.

  changeUser(e){
    console.log(e.target.value)
    this.todoForm.get('user').setValue(e.target.value, {
      onlySelf: true
    })
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    this.newTodo._id = (this.editMode)?this.id:null
    this.newTodo.todo = this.f.todo.value
    this.newTodo.user = this.f.user.value

    console.log( this.f, this.newTodo )
    this.add.emit(this.newTodo);

    this.reset()
    //
    //console.log( this.f.user.value)
  }

  addTodo() {
    
    
  }

  setUser(user){
    console.log(user)
    this.user = user
  }

}