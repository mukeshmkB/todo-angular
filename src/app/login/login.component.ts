import { Component } from '@angular/core';
import  { TodoService } from '../todo.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    name: string = "";
    password: string = "";
    error: string = "";


   constructor(private todoService: TodoService, private cookieService: CookieService, private router: Router) {}


  onSubmitSuccess(data: string){
      this.cookieService.set('user', data)
      this.router.navigate(['']);
  }

   onSubmit(){

     const userData = {name: this.name,  password: this.password}

      this.todoService.loginUser(userData).subscribe((data: any) => {

          if(data.user === "Authenticated"){
               this.onSubmitSuccess(data.user);
          }
          else{
                this.error = data.user
          }

       });
        
 
   }
   
  }
