import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  id:number;
  data:object = {};
  products:any = [];
  productObj:object = [];
  private headers = new Headers({ 'Content-Type': 'application.json'});

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  updateProduct(product){
    this.productObj = {
      "name": product.name,
      "color": product.color
    };
    const url = `${"http://localhost:5555/products"}/${this.id}`
    this.http.put(url, (this.productObj)).subscribe(
    ()  => {
      this.router.navigate(['/'])
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });
      this.http.get("http://localhost:5555/products").subscribe(
        (res: Response) => {
          this.products = res;
          for(var i = 0; i < this.products.length ; i++ ) {
            if(parseInt(this.products[i].id) === this.id) {
              this.data = this.products[i];
              break;
            }
          }
        }
      )
    }
  }

