import Order from "../data/Order";
import GetItemsFromObject from "./ItemsArrayFromJson";

export default function GetOrderFromObject(obj: any, custromer: string): Order {
  if (
    obj !== undefined &&
    obj.hasOwnProperty("id") &&
    typeof obj.id === "number" &&
    obj.hasOwnProperty("vendor") &&
    typeof obj.vendor === "string" &&
    obj.hasOwnProperty("date") &&
    typeof obj.date === "string" &&
    obj.hasOwnProperty("order") &&
    typeof obj.order === "object"
  ) {
    const result: Order = {
      id: obj.id,
      customer: custromer,
      vendor: obj.vendor,
      date: obj.date,
      order: GetItemsFromObject(obj)
    };
    return result;
  } else {
    throw new Error("invalid format");
  }
}
