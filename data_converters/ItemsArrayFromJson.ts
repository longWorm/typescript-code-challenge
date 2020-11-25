import Item from "../data/Item";

export default function GetItemsFromObject(obj: any): Item[] {
  let itemsList: Item[];
  itemsList = [];

  if (
    obj === undefined ||
    !obj.hasOwnProperty("order") ||
    typeof obj.order !== "object"
  )
    throw new Error("invalid format");

  for (const key in obj.order) {
    const value = obj.order[key];
    if (
      value !== undefined &&
      value.hasOwnProperty("quantity") &&
      typeof value.quantity === "number" &&
      value.hasOwnProperty("price") &&
      typeof value.price === "number"
    ) {
      const item: Item = {
        item: key,
        quantity: value.quantity,
        price: value.price,
        revenue: value.quantity * value.price
      };
      itemsList.push(item);
    } else {
      throw new Error("invalid format");
    }
  }
  return itemsList;
}
