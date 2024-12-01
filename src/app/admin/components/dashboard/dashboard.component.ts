import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor(private adminservice: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    })
  }

  getAllProducts() {
    this.products = [];
    this.adminservice.getAllProducts().subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      })
    })
  }

  submitForm() {
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.adminservice.getAllProductsByName(title).subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      })
    })
  }

  deleteProduct(productId: any) {
    this.adminservice.deleteProduct(productId).subscribe(
        (res) => {
            if (res.status === 204) {
                this.snackBar.open('Product deleted successfully!', 'Close', {
                    duration: 5000
                });
                this.getAllProducts();
            }
        },
        (err) => {
            if (err.status === 404) {
                this.snackBar.open('Product not found!', 'Close', {
                    duration: 5000,
                    panelClass: 'error-snackbar'
                });
            } else {
                this.snackBar.open('Error deleting product!', 'Close', {
                    duration: 5000,
                    panelClass: 'error-snackbar'
                });
            }
        }
    );
  }
}
