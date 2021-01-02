import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {TaskserviceService} from '../taskservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  messageSuccess:boolean=false
  designation=[ 
  {name: 'Admin', value: 'Admin'},
  {name: 'Manager', value: 'Manager'},
  {name: 'Staff', value: 'Staff'}
];

gender=[ 
  {name: 'Male', value: 'Male'},
  {name: 'Female', value: 'Female'},
  {name: 'Others', value: 'Others'}
];
  duplicateMail: any;
  messageError: boolean;

  constructor(private taskservice:TaskserviceService,private router:Router) { 

  
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      "name": new FormControl('',[Validators.required]),
      "gender": new FormControl('',[Validators.required]),
      "mobilenumber": new FormControl('',[Validators.required,Validators.pattern('[0-9]*')]),
      "designation": new FormControl('',[Validators.required]),
      "password": new FormControl('',[Validators.required]),
      "email": new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),

    });
   
  }

  register(){
    if(this.registerForm.valid){
      const regobj={
        "name":this.registerForm.controls['name'].value,
        "gender":this.registerForm.controls['gender'].value.value,
        "mobileNumber":this.registerForm.controls['mobilenumber'].value,
        "designation":this.registerForm.controls['designation'].value.value,
        "emailId":this.registerForm.controls['email'].value,
        "password":this.registerForm.controls['password'].value
      }
      console.log(regobj)
      this.taskservice.userregister(regobj).subscribe(res =>{
        if(res!= null && res!=undefined){
          this.messageSuccess = true;
          setTimeout(()=>{
            this.messageSuccess = false;
            this.router.navigate([''])
          },2000);
         

        }
        },err=>{
          console.log(err.error);
          this.duplicateMail=JSON.parse(err.error)
          this.messageError = true;
          setTimeout(()=>{
            this.messageError = false;
          },2000);
        }
        )
    }else{
      this.taskservice.validateAllFormFields(this.registerForm);
    }
    
      
  }

}
