import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-past-elections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './past-elections.component.html',
  styleUrl: './past-elections.component.css'
})
export class PastElectionsComponent implements OnInit{
  constructor(private dataService: DataService){}
  curElection: any;
  user = sessionStorage.getItem("user");
  college: any; //= this.dataService.getLoggedUser().college;
  result: any;
  elections: any [] = [];
  pastElecs: any [] = [];
  resultsLoaded: Promise<boolean> = Promise.resolve(false);
  flag: boolean = false;
  flag2: boolean = true; 
  
  async showResult(electionName: string){
    this.curElection = electionName;

    const result = await fetch(environment.apiUrl+"/getResults", {
      method: 'POST',
      body: JSON.stringify({
        elecName: electionName,
      }),
      headers: {'Content-type':'application/json'},
    });
    const resultResp = await result.json();
    this.result = resultResp.result;
    console.log(this.result);

    let card = document.getElementById("relative");
    if(card?.classList.contains("hide")){
      card?.classList.remove("hide");
    }else{
      card?.classList.add("hide");
    }
  } 

  close(){
    let card = document.getElementById("relative");
    if(!card?.classList.contains("hide")){
      card?.classList.add("hide");
    } 
    this.result = 0;
  }

  async ngOnInit(): Promise<void> {
    if(this.user)
    this.college = JSON.parse(this.user).college;
    const elections = await fetch(environment.apiUrl+"/getElections", {
      method: 'POST',
      body: JSON.stringify({
        collegeName: this.college,
      }),
      headers: {'Content-type':'application/json'},
    });
    const electionsResp = await elections.json();
    this.elections = electionsResp.data;
    for(let item of this.elections){
      if(item.finished == true){
        this.pastElecs.push(item);
      }
    }
    if(this.pastElecs.length != 0){
      this.flag = true;
      this.flag2 = false;
    }
    console.log(this.pastElecs);
    this.resultsLoaded = Promise.resolve(true);
  }
}
