import GetCustomerFromObject from "../CustomerFromJson";
import Customer from "../../data/Customer";

var expect = require("chai").expect;

describe("Customer From JSON converter", function() {
  it("positive test", function() {
    let customer: Customer;
    customer = GetCustomerFromObject({
      id: 2,
      vendor: "VENDOR_NAME",
      date: "ORDER_DATE",
      customer: {
        id: "CUSTOMER_GUID",
        name: "CUSTOMER_NAME",
        address: "CUSTOMER_ADDRESS"
      },
      order: {
        item1: {
          quantity: 1,
          price: 15
        },
        item2: {
          quantity: 2,
          price: 15
        },
        item3: {
          quantity: 3,
          price: 15
        }
      }
    });
    expect(customer.id).to.equal("CUSTOMER_GUID");
    expect(customer.name).to.equal("CUSTOMER_NAME");
    expect(customer.address).to.equal("CUSTOMER_ADDRESS");
  });

  it("negative test", function() {
    expect(
      GetCustomerFromObject.bind({
        id: 2,
        vendor: "VENDOR_NAME",
        date: "ORDER_DATE",
        customer: {
          id: 111233,
          name: "CUSTOMER_NAME",
          address: "CUSTOMER_ADDRESS"
        },
        order: {
          item1: {
            quantity: 1,
            price: 15
          },
          item2: {
            quantity: 2,
            price: 15
          },
          item3: {
            quantity: 3,
            price: 15
          }
        }
      })
    ).to.throw("invalid format");

    expect(GetCustomerFromObject.bind({})).to.throw("invalid format");

    expect(GetCustomerFromObject.bind("")).to.throw("invalid format");
  });
});
