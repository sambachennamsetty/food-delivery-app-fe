import { Component } from '@angular/core';
import { FoodCatalogue } from '../../shared/models/FoodItemCatalogue';
import { FoodItem } from '../../shared/models/FoodItem';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from '../service/fooditem.service';

@Component({
  selector: 'app-food-catalogue',
  templateUrl: './food-catalogue.component.html',
  styleUrl: './food-catalogue.component.css'
})
export class FoodCatalogueComponent {

  restaurantId: number;
  foodItemResponse: FoodCatalogue;
  foodItemCart: FoodItem[] = [];
  orderSummary : FoodCatalogue;

  // activated route is to fetch {restaurant_id} from the route.
  constructor(private route: ActivatedRoute, private foodItemService: FoodItemService, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.restaurantId = +params.get('id');
    });

    this.getFoodItemsByRestaurant(this.restaurantId);

  } 

  getFoodItemsByRestaurant(restaurantId: number) {
    this.foodItemService.getFoodItemsByRestaurant(restaurantId).subscribe(
      data => {
        this.foodItemResponse = data;
      }
    )
  }




 increment(foodItem: FoodItem) {
  foodItem.quantity++;
  const index = this.foodItemCart.findIndex(item=> item.id === foodItem.id);

  if(index === -1) {
    // If record does not exist, add it to the array
    this.foodItemCart.push(foodItem);
  } else {
    // If record exists, update it in the array
    this.foodItemCart[index] = foodItem;
  }

 }


 decrement(foodItem: FoodItem) {

  if(foodItem.quantity > 0) {
    foodItem.quantity--;

    const index = this.foodItemCart.findIndex(item => item.id === foodItem.id);
    if(this.foodItemCart[index].quantity == 0) {
      this.foodItemCart.splice(index, 1);
    } else {
      // If record exists, update it in the array
      this.foodItemCart[index] = foodItem;
    }
  }
 }

 onCheckOut() {
  this.foodItemCart;
  this.orderSummary = {
    foodItemsList: [],
    restaurant: null
  }
  this.orderSummary.foodItemsList = this.foodItemCart;
  this.orderSummary.restaurant = this.foodItemResponse.restaurant;
  this.router.navigate(['/orderSummary'], {queryParams: {data: JSON.stringify(this.orderSummary)}});
}




}
