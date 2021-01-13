import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GlobalService } from '../services/global.service';

@Injectable({
    providedIn: 'root'
})
export class FeedbackGuard implements CanActivate {
  
  constructor(private router:Router,private globalService:GlobalService) {}

  canActivate(): boolean {
    return true;
  }
}