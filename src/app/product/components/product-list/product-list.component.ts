import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  
  Products?: Product[];
  currentProduct: Product = {};
  currentIndex = -1;
  name = '';

  constructor(private ProductService: ProductsService) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    this.ProductService.getAll()
      .subscribe({
        next: (data) => {
          this.Products = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveProducts();
    this.currentProduct = {};
    this.currentIndex = -1;
  }

  setActiveProduct(Product: Product, index: number): void {
    this.currentProduct = Product;
    this.currentIndex = index;
  }

  removeAllProducts(): void {
    this.ProductService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchName(): void {
    this.currentProduct = {};
    this.currentIndex = -1;

    this.ProductService.findByTitle(this.name)
      .subscribe({
        next: (data) => {
          this.Products = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
