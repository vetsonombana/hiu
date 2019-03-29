import { Component, OnInit } from '@angular/core';
import { Login_ws } from '../services/Login_ws';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public msg : string;
  
  constructor(private  login : Login_ws ,private router : Router) { }

  ngOnInit() {

  }
  
  public connecter (user : any) : void{
      this.login.connecter(user.email,user.password).then(response => { 
        this.msg = response.message;
        if(response.status != "false"){
          localStorage.setItem("logsession", user.id);
          this.router.navigateByUrl('/carte');
         }
      }
    );
  }

  public redirect () : void{
      this.router.navigateByUrl('/inscrire');  
  }
}
