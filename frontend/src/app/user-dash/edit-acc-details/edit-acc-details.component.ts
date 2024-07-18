import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { FormControl, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-edit-acc-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './edit-acc-details.component.html',
  styleUrl: './edit-acc-details.component.css'
})
export class EditAccDetailsComponent implements OnInit{
  constructor(private dataService: DataService){}
  userObj = sessionStorage.getItem("user");
  user: any;
  dupObj = this.dataService.getLoggedUser();

  ngOnInit(){
    if(this.userObj)
    this.user = JSON.parse(this.userObj);
  }

  EditAccDetailsForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    id: new FormControl(''),
  })

  isEdit: boolean = false;

  toggle(){
    console.log('started');
    this.isEdit = !this.isEdit;
  }

  async saveEdit(newUserName: string, id: string){
    const userData = this.dataService.getLoggedUser();
    this.dataService.updateLoggedUserAcc(newUserName);
    this.user.username = newUserName;
    sessionStorage.removeItem("user");
    sessionStorage.setItem("user", JSON.stringify(this.user));
    console.log(this.dataService.getLoggedUser());
    await fetch(environment.apiUrl+'/updateUserName',{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newUserName: newUserName, id: id}),
    }).catch((err)=>{
      console.log(err);
    })
  }
}
