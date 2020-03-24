import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {TodoListComponent} from './todo-list/todo-list.component'
import {AuthComponent} from './auth/auth.component'
import {AuthGuard} from './auth.guard'

// http://localhost:4200/ -> HomeComponent
// http://localhost:4200/about -> AboutComponent
// http://localhost:4200/posts -> PostsComponent

const routes: Routes = [
  {path: '', component: TodoListComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}