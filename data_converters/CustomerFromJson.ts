import Customer from "../data/Customer";

export default function GetCustomerFromObject(obj: any): Customer {
  if (
    obj !== undefined &&
    obj.hasOwnProperty("customer") &&
    obj.customer.hasOwnProperty("id") &&
    typeof obj.customer.id === "string" &&
    obj.customer.hasOwnProperty("name") &&
    typeof obj.customer.name === "string" &&
    obj.customer.hasOwnProperty("address") &&
    typeof obj.customer.address === "string"
  ) {
    const result: Customer = {
      id: obj.customer.id,
      name: obj.customer.name,
      address: obj.customer.address
    };
    return result;
  } else {
    throw new Error("invalid format");
  }
}
