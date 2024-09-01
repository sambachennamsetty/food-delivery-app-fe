import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/order-summary.service';
import { OrderDTO } from '../models/OrderDTO';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {

  orderSummary?: OrderDTO;
  obj: any;
  total? : any;
  showDialog: boolean = false;


  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router){}



  ngOnInit() {
    const data = this.route.snapshot.queryParams['data'];
    this.obj = JSON.parse(data);
    this.obj.userId = 1
    this.orderSummary = this.obj;

    this.total = this.orderSummary.foodItemsList.reduce((accumulator, currentvalue) => {
      return accumulator + (currentvalue.quantity * currentvalue.price);
    }, 0);

  }

  saveOrder() {
    this.orderService.saveOrder(this.orderSummary)
    .subscribe(
      response => {
        this.showDialog = true;
      },
      error => {
        console.error('Failed to save data:', error);
      }
    );

  }

  closeDialog() {
    this.showDialog = false;
    this.router.navigate(['/']);
  }
}
