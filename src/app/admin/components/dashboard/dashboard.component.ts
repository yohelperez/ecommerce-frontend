import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor(private adminservice: AdminService,
    private fb: FormBuilder
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
}
