import GetItemsFromObject from "../ItemsArrayFromJson";
import Item from "../../data/Item";

var expect = require("chai").expect;

describe("Order Items From JSON converter", function() {
  it("positive test", function() {
    let items: Item[];
    items = GetItemsFromObject({
      id: 2,
      vendor: "VENDOR_NAME",
      date: "ORDER_DATE",
      customer: {
        id: "CUSTOMER_GUID",
        name: "Alma Prantoni",
        address: "9 Trailsway Road"
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
    expect(items.length).to.equal(3);
    expect(items[0].item).to.equal("item1");
    expect(items[0].quantity).to.equal(1);
    expect(items[0].price).to.equal(15);
    expect(items[0].revenue).to.equal(15);
    expect(items[1].item).to.equal("item2");
    expect(items[1].quantity).to.equal(2);
    expect(items[1].price).to.equal(15);
    expect(items[1].revenue).to.equal(30);
    expect(items[2].item).to.equal("item3");
    expect(items[2].quantity).to.equal(3);
    expect(items[2].price).to.equal(15);
    expect(items[2].revenue).to.equal(45);
  });

  it("negative test", function() {
    expect(
      GetItemsFromObject.bind({
        order: {
          item1: {
            quantity: 100,
            price: 15
          },
          item2: {
            quantity: 19,
            price: 7
          },
          item3: {
            price: 9
          }
        }
      })
    ).to.throw("invalid format");

    expect(GetItemsFromObject.bind({})).to.throw("invalid format");

    expect(GetItemsFromObject.bind("")).to.throw("invalid format");
  });
});
