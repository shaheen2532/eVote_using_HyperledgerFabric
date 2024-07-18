import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import Swal from 'sweetalert2';
import axios from 'axios';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent {
  constructor(private _router: Router, private dataService: DataService){}
  displayed = false;
  elecName = this.dataService.getElecName();
  candForm = {
    cand_name: '',
    video: '',
  }
  candArray: any [] = [];
  file: any;
  link: any;

  addCand(){
    console.log(this.link);
    const data = {
      cand_name: this.candForm.cand_name, 
      promise: this.link,
    }
    this.candArray.push(data);
    console.log(this.candArray);
    this.candForm.cand_name = '';
    this.candForm.video = '';
  }

  async setCands(){
    const set = await fetch(environment.apiUrl+"/newCandidate",{
      method: 'POST',
      body: JSON.stringify({
        election_name: this.elecName,
        data: this.candArray,
      }),
      headers: {'Content-type': 'application/json'}
    }) 

    const setResp = await set.json();
    if(setResp.added == true){
      Swal.fire({
        title: 'Election created!',
        text: this.elecName,
        icon: 'success',
        width: '40%',
        confirmButtonText: 'Done'
      }).then((result) => {
        if(result.isConfirmed){
          this._router.navigateByUrl("college-dash/landing");
        }
      })
    }else{
      Swal.fire({
        title: 'Server error',
        text: 'Candidates not updated',
        timer: 2000,
      });
    }
  } 

  async select(event: any){
    if(event.target.files.length > 0){}
    this.file = event.target.files[0];
    const videoData = new FormData();
    videoData.append("file", this.file);
    videoData.append("upload_preset", "videos");

    const resource_type = 'video';
    const cloudName = 'dwlwpqhta';
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resource_type}/upload`;
    const res = await axios.post<any>(api, videoData);
    const p = res.data.secure_url;
    console.log(p);
    this.link = p;
  } 
}
