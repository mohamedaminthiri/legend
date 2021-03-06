import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ValidateService} from '../services/validate.service';

import * as moment from 'moment';

@Component({
  selector: 'app-online-issue-config',
  templateUrl: './online-issue-config.component.html',
  styleUrls: ['./online-issue-config.component.css']
})
export class OnlineIssueConfigComponent implements OnInit {
  date: Date;
  dateFormatted: string;
  volume: number;
  issue: number;
  currentUser: String;
  errorMessage: String = "";
  errorMessageEdit: String = "";
  validateMessage: String = "";
  validateMessageEdit: String = "";
  deleteMessage : String = "";
  deleteMessageEdit : String = "";
  successMessage : String = "";
  successMessageEdit : String = "";
  onlineIssues : object[];
  onlineIDEdit: String;
  dateEdit: Date;  
  volumeEdit: number;
  issueEdit: number;
  onlineIndex: number = null;

  constructor(
    private authService: AuthService,
    private validateService: ValidateService, 
    private router: Router
  ) { }

  ngOnInit() {

    this.clearFields();

    this.authService.getProfile().subscribe(profile => {
      this.currentUser = profile.user.username;
    },
    err => {
      console.log(err);
      return false;
    });
    this.onGetOnline();
  }

  onGetOnline() {
    this.authService.getOnline().subscribe(entries => {
      this.onlineIssues = entries; 
      console.log(this.onlineIssues);
      this.onlineIssues.map( obj => {
        obj['dateFormatted'] = moment(obj['date']).format('MMMM DD, YYYY');
        return obj;
      }) 
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  onOnlineSubmit(){
    const online = {
      date: this.date,
      volume: this.volume,
      issue: this.issue
    }

    //Required fields
    if(!this.validateService.validateOnline(online)) {
      this.validateMessage = "Please fill in Date, Volume and Issue";
      setTimeout(() => {
        this.validateMessage = "";
        return false;
      }, 2000);
    }
    else {
      this.authService.addOnline(online).subscribe(data => {
        console.log(data);
        if(data.success){
          this.successMessage = data.msg;
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        } 
        else {
          this.errorMessage = data.msg;
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        }
      },
      err => {
      console.log(err);
      return false;
      });
    }
  }

  onOnlineEdit(issue, index){
    this.onlineIDEdit = issue["_id"]; 
    this.dateEdit = issue['date']; 
    this.volumeEdit = issue['volume']; 
    this.issueEdit = issue['issue']; 
    this.onlineIndex = index;
  }

  onEditSubmit() {
    const onlineEdit = {
      onlineID: this.onlineIDEdit, //to identify this doc in database
      date: this.dateEdit, 
      volume: this.volumeEdit, 
      issue: this.issueEdit 
    }

    if(!this.validateService.validateOnline(onlineEdit)) {
      this.validateMessageEdit = "Please fill in Date, Volume and Issue";
      setTimeout(() => {
        this.validateMessageEdit = "";
        return false;
      }, 2000);
    }
    else {
      this.authService.updateOnline(onlineEdit).subscribe(doc => {
        console.log(doc);
        if(doc.success){
          this.successMessageEdit = doc.msg;
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        }
        else {          
          this.errorMessageEdit = doc.msg;
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        }
      },
      err => {
        console.log(err);
        return false;
      });
    }
  }

  onOnlineDelete(online, index) {
    const onlineID = online["_id"]; 
    this.authService.deleteOnline(onlineID).subscribe(online => {
      console.log(online);
      if(online.success){
        this.deleteMessageEdit = online.msg;
        console.log(this.deleteMessageEdit);
        setTimeout(() => {
          this.ngOnInit();
        }, 2000);
      }
      else {
        this.errorMessageEdit = online.msg;
        setTimeout(() => {
          this.ngOnInit();
        }, 2000);
      }
    },
    err => {
      console.log(err);
      return false;
    });

  }

  editCancel(){
    this.ngOnInit();
  }

  clearFields() {
    this.date = null;
    this.volume = null;
    this.issue = null;
    this.onlineIndex = null;
    this.errorMessage = "";
    this.errorMessageEdit = "";
    this.validateMessage = "";
    this.validateMessageEdit = "";
    this.deleteMessage = "";
    this.deleteMessageEdit = "";
    this.successMessage = "";
    this.successMessageEdit = "";
  }

}
