import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url ='http://localhost:5000/api/v1/categories';
  constructor(private http: HttpClient) { }

  getCategory(){
    return this.http.get(this.url)
  }
}
