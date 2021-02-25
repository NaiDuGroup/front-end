import { Product } from "./product.type";

export interface Order {
    orderId?: number,
    orderType: string,
    address: string,
    customerEmail: string,
    customerName: string,
    customerPhoneNumber: string,
    orderTotalPrice: number,
    orderItems: Product[]
}