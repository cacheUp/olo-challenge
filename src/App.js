import React, { useState, useEffect } from "react";
import { pizzaData } from "./pizzas.js";
import { Card, Header, Icon } from "semantic-ui-react";
import uuidv4 from "uuid/v4";

function App() {
  const [pizzaArr, setPizzaArr] = useState([]);

  useEffect(() => {
    pizzaSort(pizzaData);
  }, []);

  const pizzaSort = array => {
    let pizzaTracker = [];
    let pizzaSortedArr = [];
    for (let i = 0; i < array.length; i++) {
      pizzaTracker.push(pizzaData[i].toppings);
    }
    let newArr = pizzaTracker.flatMap(x => x);
    newArr.forEach((x, i) => {
      if (pizzaSortedArr.length === 0) {
        pizzaSortedArr.push({ topping: x, count: 1 });
      } else if (pizzaSortedArr.some(y => y.topping === x)) {
        let index = pizzaSortedArr.findIndex(z => z.topping === x);
        pizzaSortedArr[index].count++;
        // console.log(index);
      } else {
        pizzaSortedArr.push({ topping: x, count: 1 });
      }
    });
    setPizzaArr(
      pizzaSortedArr.sort((a, b) => (a.count < b.count ? 1 : -1)).slice(0, 20)
    );
  };

  const mapProductsToItems = products => {
    return products.map((product, index) => ({
      header: `Rank #${index + 1}: ${product.topping}`,
      image:
        " https://res.cloudinary.com/cloud-9/image/upload/v1573792206/pizza-toppings.jpg",
      meta: `${product.count} orders`,
      color: "teal",
      fluid: true,
      key: index
    }));
  };

  // const pizzas = pizzaData.map((item, index) => {
  //   return item.toppings.map((item, index) => {});
  // });

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "1000px"
      }}
    >
      <Header as="h1" icon textAlign="center" style={{ marginTop: "30px" }}>
        <Icon name="food" circular />
        <Header.Content>Top 20 Pizza Orders</Header.Content>
      </Header>
      <Card.Group
        key={uuidv4()}
        stackable
        itemsPerRow="4"
        centered
        items={mapProductsToItems(pizzaArr)}
      />
    </div>
  );
}

export default App;
