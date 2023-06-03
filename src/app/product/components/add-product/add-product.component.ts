import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    stock: 60,
    price: 500,
    imageurl: './',
  };
  submitted = false;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
  }

  saveProduct(): void {
    const data = {
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      stock: this.product.stock,
      image_url: this.product.imageurl
    };

    this.productService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      name: '',
      description: '',
      price: 0,
      stock: 1,
    };
  }

}
