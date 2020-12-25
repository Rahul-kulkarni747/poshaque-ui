import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class HttpRequestService {

  backendUrl:string = "http://localhost:8080/";

  constructor(private http: HttpClient) {
  }

  makeGetCall(url){
    return this.http.get(this.backendUrl+url);
  }

  makePostCall(url,object){
    return this.http.post(this.backendUrl+url,object);
  }

  makeDeleteCall(url){
    return this.http.delete(this.backendUrl+url);
  }

}