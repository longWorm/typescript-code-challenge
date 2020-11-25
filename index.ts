const StreamArray = require("stream-json/streamers/StreamArray");
const path = require("path");
const fs = require("fs");
const util = require("util");

import Customer from "./data/Customer";
import Order from "./data/Order";

import GetCustomerFromObject from "./data_converters/CustomerFromJson";
import GetOrderFromObject from "./data_converters/OrderFromJson";

const writeFilePromisified = util.promisify(fs.writeFile);

let customers: Customer[];
customers = [];

let orders: Order[];
orders = [];

const jsonStream = StreamArray.withParser();

jsonStream.on("data", ({ key, value }: { key: string; value: object }) => {
  const customer = GetCustomerFromObject(value);
  customers.push(customer);
  const order = GetOrderFromObject(value, customer.id);
  orders.push(order);
});

jsonStream.on("end", () => {
  const result = {
    customers: customers,
    orders: orders
  };

  writeFilePromisified(
    path.join(__dirname, "../data-transformed.json"),
    JSON.stringify(result, null, 4)
  )
    .then(function(res: any) {
      console.log("Done");
    })
    .catch(function(err: any) {
      console.log("Failed to safe result into a file. Error: " + err);
    });
});

const filename = path.join(__dirname, "../data.json");
fs.createReadStream(filename).pipe(jsonStream.input);
