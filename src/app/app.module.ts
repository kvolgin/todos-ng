import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component'
import { TodoListComponent } from './todo-list/todo-list.component'
import { TodoListFooterComponent } from './todo-list-footer/todo-list-footer.component'
import { TodoListHeaderComponent } from './todo-list-header/todo-list-header.component'
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {AppRoutingModule} from './app-routing.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { TodoDataService } from './todo-data.service';
import { ApiService } from './api.service';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TodoListComponent,
    TodoListFooterComponent,
    TodoListHeaderComponent,
    TodoListItemComponent,
    LoginComponent,
    SigninComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    TodoDataService, 
    ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}