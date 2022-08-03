import { OrderStatus, PaymentMethod } from "./enums";

interface Order {
  id: number;
  creator_id: number;
  restaurants_id: number;
  recipes_id: number[];
  notes: string[];
  create_date: Date;
  update_date: Date;
  deliver_address: string;
  status: OrderStatus;
  payment_method: PaymentMethod;
}

export default Order;
