import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GlobalService } from '../services/global.service';

@Injectable({
    providedIn: 'root'
})
export class SignUpGuard implements CanActivate {
  
  constructor(private router:Router,private globalService:GlobalService) {}

  canActivate(): boolean {
    if (this.globalService.userAuth.isTokenValid()) {
      this.router.navigate(['shop']);
      return false;
    }
    return true;
  }
}