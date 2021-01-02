import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {TaskserviceService} from '../taskservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  passordmismatch:boolean=false
  serverErrorMessages: any;
  constructor(private taskservice:TaskserviceService,private router:Router) { }

  ngOnInit(): void {
    this.loginform = new FormGroup({
      "emailId": new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      "password": new FormControl(null,[Validators.required])
    });


  }

  loginfunction(){
    if(this.loginform.valid){
      const emaildata={"emailid":this.loginform.controls['emailId'].value}
      this.taskservice.login(this.loginform.value).subscribe(response =>{
        if(response!= null && response!=undefined ){
          localStorage.setItem('token',JSON.parse(response).token)

          this.taskservice.userdata(emaildata).subscribe(respppp=>{
            localStorage.setItem('Desigantion',JSON.parse(respppp).user.designation)
            localStorage.setItem('Name',JSON.parse(respppp).user.name)
            this.router.navigate(['/dashboard'])
            console.log("res,res",JSON.parse(respppp));
          })
        }
      },
      err => {
        this.serverErrorMessages = JSON.parse(err.error).message;
       this.passordmismatch=true
        setTimeout(()=>{
          this.passordmismatch=false
        },2000);
      })
    }else{
      this.taskservice.validateAllFormFields(this.loginform);
    }
    
  
    
  }

 


}
