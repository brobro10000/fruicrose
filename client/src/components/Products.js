import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_PRODUCTS } from "../utils/actions";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";
import { Container, Row, Dropdown, Col, Button, Card, ButtonGroup } from "react-bootstrap";
import { idbPromise } from "../utils/helpers";
import Loading from "./Loading";
import banana from "../assets/images/banana.jpeg";
import blueberry from "../assets/images/blueberry.jpeg";
import fujiapple from "../assets/images/fujiapple.jpg";
import honeycrispapple from "../assets/images/honeycrispapple.jpg";
import lemon from "../assets/images/lemon.jpeg";
import mango from "../assets/images/mango.jpeg";
import peach from "../assets/images/peach.jpeg";
import raspberry from "../assets/images/raspberry.jpeg";
import tangerine from "../assets/images/tangerine.jpeg";
import watermelon from "../assets/images/watermelon.jpeg";
import SingleProduct from "./SingleProduct";

function Products() {
  const fruitImages = [
    banana,
    blueberry,
    fujiapple,
    honeycrispapple,
    lemon,
    mango,
    peach,
    raspberry,
    tangerine,
    watermelon,
  ];
  const sortByArr = ["Alphabetical", "Reverse Alphabetical", "Price Ascending", "Price Descending"];
  const products = useSelector((state) => state.products);
  const [categoryList, updateCategoryList] = useState(0);
  const dispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  const [sortType, selectSort] = useState([])
  const allSorts = []
  function loadInitialData() {
    if (data) {
      var productArr = data.products;
      var updatedProductArr = productArr.map((element) => {
        return {
          ...element,
          imageLink: fruitImages.filter(
            (fruit) =>
              fruit.includes(element.name.toLowerCase().replace(" ", "")) ===
              true
          ),
        };
      });

      // eslint-disable-next-line
      dispatch({
        type: UPDATE_PRODUCTS,
        products: updatedProductArr,
      });
    }
  }

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  useEffect(() => {
    return loadInitialData();
    // eslint-disable-next-line
  }, [data, loading, dispatch]);

  useEffect(() => {
    var allCategories = [];
    products.forEach((element) => {
      if (allCategories.indexOf(element.categories[0].name) === -1) {
        allCategories.push(element.categories[0].name);
      }
    });

    return updateCategoryList(allCategories);
  }, [products]);

  useEffect(() => {
    var temp = []
    var alphabetical = []
    var reverseAlphabetical = []
    var price = []
    var reversePrice = []

    products.forEach((element) => {
      temp.push(element.name);
    });
    temp.sort();

    temp.forEach((element) => {
      products.forEach((item) => {
        if (item.name === element) {
          alphabetical.push(item);
        }
      });
    });
    temp.sort().reverse()
    temp.forEach((element) => {
      products.forEach((item) => {
        if (item.name === element) {
          reverseAlphabetical.push(item);
        }
      });
    });

    products.forEach((element) => {
      temp.push(element.price);
    });
    temp.sort();
    temp.forEach((element) => {
      products.forEach((item) => {
        if (item.price === element) {
          price.push(item);
        }
      });
    });
    temp.sort().reverse();
    temp.forEach((element) => {
      products.forEach((item) => {
        if (item.price === element) {
          reversePrice.push(item);
        }
      });
    });

    allSorts.push(alphabetical)
    allSorts.push(reverseAlphabetical)
    allSorts.push(price)
    allSorts.push(reversePrice)

    return selectSort(allSorts)
  }, [])
  function sortBy(e) {
    const sortedParam = e.target.innerHTML;

    if (sortedParam === sortByArr[0]) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: sortType[0],
      });
    } else if (sortedParam === sortByArr[1]) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: sortType[1],
      });
    } else if (sortedParam === sortByArr[2]) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: sortType[2],
      });
    } else if (sortedParam === sortByArr[3]) {
      console.log(sortType)
      dispatch({
        type: UPDATE_PRODUCTS,
        products: sortType[3],
      });
    }
}

function filterItem(e) {
  const filterCategory = e.target.innerHTML;
  if (filterCategory === "Reset") {
    return loadInitialData();
  }
  var filteredCategories = [];
  products.forEach((element) => {
    if (element.categories[0].name === filterCategory) {
      filteredCategories.push(element);
    }
  });
  dispatch({
    type: UPDATE_PRODUCTS,
    products: filteredCategories,
  });
}

if (!products?.length) {
  return <Loading />;
}
var increment = 0
return (
  <Container>
    <h1 className="center">Shop fruits!</h1>
    <Card body>
      <ButtonGroup>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-button-dark" variant="secondary">
            Category
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            {categoryList
              ? categoryList.map((product) => {
                return (
                  <Dropdown.Item key={product} onClick={filterItem}>
                    {product}
                  </Dropdown.Item>
                );
              })
              : null}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-button-dark" variant="secondary">
            Sort By
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            {sortByArr
              ? sortByArr.map((type) => {
                return (
                  <Dropdown.Item key={type.toLowerCase().replace(" ", "")} onClick={sortBy}>
                    <Row>
                      <Col>{type}</Col>
                    </Row>
                  </Dropdown.Item>
                );
              })
              : null}
          </Dropdown.Menu>
        </Dropdown>

        <Button variant='warning' onClick={filterItem}>Reset</Button>
      </ButtonGroup>
    </Card>
    <Row>
      {products.map((product) => {

        return (
          <Col>
            <SingleProduct
              key={product._id}
              _id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
              unit={product.unit}
              categories={product.categories}
              imageLink={product.imageLink}
              count={increment++ % 3}
            />
          </Col>
        );
      })
      }
    </Row>
  </Container>
);
}

export default Products;
