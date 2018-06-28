import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Headers } from '@angular/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private http: HttpClient) { }
  id:number;
  private headers = new Headers({ 'Content-Type': 'application.json'});
  
  products = [];
    fetchData= function() {
        this.http.get("http://localhost:5555/products").subscribe(
          (res: Response) => {
            this.products = res;
          }
        )
      }

      deleteProduct= function(id) {
        if(confirm("Are you sure, you want to delete this product?")) { 
        const url = `${"http://localhost:5555/products"}/${id}`
        return this.http.delete(url).subscribe(
          () => { 
          this.fetchData();  
          })
        }
    }
  ngOnInit() {

    this.fetchData();
  }

}
