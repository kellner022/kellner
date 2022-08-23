import { OrderStatus, PaymentMethod } from "./enums";

export interface RecipeItem {
  restaurant_id: number;
  recipe_id: number;
  quantity: number;
}

interface Order {
  id: number;             // The unique id of the order
  creator_id: number|undefined;     // The user who created the order
  restaurants_id: number; // The id of the restaurant to which the order is belonging
  recipes: RecipeItem[];  // The list of recipes in this order
  notes?: string[];        // The list of notes attached to this order
  create_date: string;      // The date when the order was created
  update_date: string;      // The last date when this order was updated
  deliver_address?: string;  // To where the order is shiped, this might be differ with the one of the residence address
  status: OrderStatus;      // The current status of this order
  payment_method: PaymentMethod;  // Payment method, paypal, credit card, debit card, eg.,
}

export default Order;
