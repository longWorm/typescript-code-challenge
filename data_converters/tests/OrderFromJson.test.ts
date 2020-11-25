import GetOrderFromObject from "../OrderFromJson";
var expect = require("chai").expect;

describe("Order From JSON converter", function() {
  it("positive test", function() {
    const order = GetOrderFromObject(
      {
        id: 2,
        vendor: "VENDOR_NAME",
        date: "ORDER_DATE",
        customer: {
          id: "CUSTOMER_GUID",
          name: "Alma Prantoni",
          address: "9 Trailsway Road"
        },
        order: {
          cake: {
            quantity: 100,
            price: 15
          },
          punch: {
            quantity: 19,
            price: 7
          },
          "bouncy house": {
            quantity: 4,
            price: 9
          }
        }
      },
      "CUSTOMER_GUID"
    );

    expect(order.id).to.equal(2);
    expect(order.customer).to.equal("CUSTOMER_GUID");
    expect(order.vendor).to.equal("VENDOR_NAME");
    expect(order.date).to.equal("ORDER_DATE");

    expect(order.order.length).to.equal(3);
    expect(order.order[0].item).to.equal("cake");
    expect(order.order[0].quantity).to.equal(100);
    expect(order.order[0].price).to.equal(15);
    expect(order.order[0].revenue).to.equal(15 * 100);
  });

  it("negative test", function() {
    expect(
      GetOrderFromObject.bind(
        {
          id: 2,
          date: "ORDER_DATE",
          customer: {
            id: "CUSTOMER_GUID",
            name: "Alma Prantoni",
            address: "9 Trailsway Road"
          },
          order: {
            cake: {
              quantity: 100,
              price: 15
            },
            punch: {
              quantity: 19,
              price: 7
            },
            "bouncy house": {
              quantity: 4,
              price: 9
            }
          }
        },
        "CUSTOMER_GUID"
      )
    ).to.throw("invalid format");

    expect(GetOrderFromObject.bind({}, "CUSTOMER_GUID")).to.throw(
      "invalid format"
    );

    expect(GetOrderFromObject.bind("", "CUSTOMER_GUID")).to.throw(
      "invalid format"
    );
  });
});
