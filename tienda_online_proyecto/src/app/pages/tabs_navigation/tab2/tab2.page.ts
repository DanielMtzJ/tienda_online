import { Component } from '@angular/core';
import { ProductService } from '../../../services/api/products/product.service';
import { Product } from '../../../services/api/products/product';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  products: Product[] = [];

  constructor(private productService: ProductService, private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  logout() {
    this.afAuth.signOut().then(() => {
      console.log('El usuario ha cerrado sesión con éxito.');
      this.router.navigate(['/login']);
    })
    .catch((error) => {
      console.error('Ha ocurrido un error al cerrar sesión:', error);
    });
  }
}
