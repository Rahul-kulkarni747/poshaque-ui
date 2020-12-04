import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../common/services/httprequest.service';
import { Payload } from '../common/model/payload';
import { Router } from '@angular/router';
import { GlobalService } from '../common/services/global.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:any = {};
  errorMessage = "";

  constructor(private httpReq:HttpRequestService, private router:Router, private globalService:GlobalService) { }

  ngOnInit() {
  }

  login(){
    this.httpReq.makePostCall("login",this.user).subscribe((res:Payload)=>{
      if(res.hasError){
        this.errorMessage = "Invalid username or password.";
      }else{
        localStorage.setItem("token",res.body.token);
        this.router.navigate(['/shop']);
        this.globalService.userAuth.init();
      }
    });
  }

}
