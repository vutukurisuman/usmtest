import { Component, OnInit,Renderer2, ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {TaskserviceService} from '../taskservice.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  @ViewChild('test') test: ElementRef;
  userdetails:Array<any> = [];
  managerdetails:Array<any> = [];
  admindetails:Array<any> = [];
  displaystaff:boolean=false;
  displayadmin:boolean=false;
  deleteuserdtls:boolean=false;
  logginedas: string;
  constructor(private router:Router,
    private renderer: Renderer2,
    private taskservice:TaskserviceService 
    ) { }

  ngOnInit(): void {
    this.getalluserdata();  
    this.logginedas=localStorage.getItem('Desigantion')

  }

  applyclass(){
    this.renderer.addClass(this.test.nativeElement,'background');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('Name');
    localStorage.removeItem('Desigantion');
    this.router.navigate(['']);
  }

  getalluserdata(){
   this.taskservice.alluserdata().subscribe(response=>{
    this.userdetails=JSON.parse(JSON.stringify(response))
    if(localStorage.getItem('Desigantion') === "Admin") {
      this.displaystaff=false
      this.displayadmin=true
      this.admindetails=this.userdetails
    }
     else if(localStorage.getItem('Desigantion') === "Manager"){
       this.displaystaff=true
       this.displayadmin=false
       this.managerdetails=this.userdetails.filter(d=>d.designation === "Staff")
       
     }
   })
  }

  deleteuser(index){
    const deldata={
      "id":this.userdetails[index]._id
    }
    console.log('data',deldata);
    
    this.taskservice.deleteuserid(deldata).subscribe(delresponse=>{
      if(delresponse!=null && delresponse!=undefined ){
        this.deleteuserdtls = true;
          setTimeout(()=>{
            this.deleteuserdtls = false;
            this.getalluserdata();
          },2000);
      }
    }) 
  }
  

}
