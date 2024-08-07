import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { EditAccDetailsComponent } from './edit-acc-details/edit-acc-details.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-user-dash',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ProfileComponent, EditAccDetailsComponent],
  templateUrl: './user-dash.component.html',
  styleUrl: './user-dash.component.css'
})
export class UserDashComponent {
  constructor(private dataService: DataService){}
  us = sessionStorage.getItem("user");
  user: any;

  buttonStatus = false;
  ngOnInit(){
    if(this.us)
    this.user = JSON.parse(this.us);
    if(this.user.college == "NU"){
      this.buttonStatus = true;
    }
  }

  userObj = this.dataService.getLoggedUser();
    
  collegeCheck(){
    if(this.userObj.college){
      
    }
  }
}
