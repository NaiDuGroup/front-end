import { environment } from "../../environments/environment";

export const apiGoodFoodGetProductsByCategoryId = () => `${environment.goodFoodApiHost}/api/getItems`;
export const apiGoodFoodSendOrder = () => `${environment.goodFoodApiHost}/api/postOrder`;