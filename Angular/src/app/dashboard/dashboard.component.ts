import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  hidereport:boolean=true
  logginedas:any;
  name:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.logginedas=localStorage.getItem('Desigantion')
    this.name=localStorage.getItem('Name')
    if(localStorage.getItem('Desigantion') === "Staff") this.hidereport=false
  
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('Name');
    localStorage.removeItem('Desigantion');
    this.router.navigate([''])
  }

}
