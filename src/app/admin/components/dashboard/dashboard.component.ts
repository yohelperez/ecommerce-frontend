import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  products: any[] = [];

  constructor(private adminservice: AdminService) {}

  ngOnInit() {
    this.getAllProducts();
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
}
