import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: any[] = [];
  newTodo: any = {taskName: "", taskStatus: ""};
  selectedTodo: any = {};
 

  constructor(private todoService: TodoService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getTodos();

  }


  getTodos(): void {
    this.todoService.getTodos().subscribe((data: any) => {
       this.todos = data
    });
  }

  addTodo(): void {

    this.todoService.createTodo(this.newTodo).subscribe((data: any) => {
      this.todos.push(data);
      this.newTodo =  {taskName: "", taskStatus: ""};
    });
  }

  editTodo(id: number): void {
   
    this.todoService.getTodoById(id).subscribe((data) => {
      this.selectedTodo = data;
    });
  }

  updateTodo(): void {
    this.todoService.updateTodo(this.selectedTodo.id, this.selectedTodo).subscribe(() => {
      this.getTodos();  
      this.selectedTodo = {};  
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id);  
    });
  }
}
