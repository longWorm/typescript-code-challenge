import Item from "./Item";

export default interface Order {
  id: number;
  vendor: string;
  date: string;
  customer: string;
  order: Item[];
}
