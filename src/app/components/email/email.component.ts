import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from 'src/app/service/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  data = {
    to:"",
    subject:"",
    message:""
  }

  spinnerFlag:boolean = false;

  constructor(private emailService:EmailService, private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  doSubmitForm(){
    console.log("tring to submit form.....");
    console.log("DATA: ", this.data);
    if(this.data.to == ""){
      this.snack.open("Receiver address cannot be empty.", "OK");
      return;
    }
    this.spinnerFlag = true;
    this.emailService.sendEmail(this.data).subscribe(
      response=>{
        console.log(response);
        this.spinnerFlag = false;
        this.snack.open("Email send success.", "OK");
      },
      error=>{
        console.log(error);
        this.spinnerFlag = false;
        this.snack.open("Error, email not sent.", "OK");
      }
    )
  }

}
