import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_PRODUCTS } from "../utils/actions";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";
import {  Container, Row, Dropdown, Col, Button } from "react-bootstrap";
import banana from '../assets/images/banana.jpeg'
import blueberry from '../assets/images/blueberry.jpeg'
import fujiapple from '../assets/images/fujiapple.jpg'
import honeycrispapple from '../assets/images/honeycrispapple.jpg'
import lemon from '../assets/images/lemon.jpeg'
import mango from '../assets/images/mango.jpeg'
import peach from '../assets/images/peach.jpeg'
import raspberry from '../assets/images/raspberry.jpeg'
import tangerine from '../assets/images/tangerine.jpeg'
import watermelon from '../assets/images/watermelon.jpeg'
import SingleProduct from "./SingleProduct";
import Loading from './Loading'
import { idbPromise } from "../utils/helpers";

function Products() {
  const fruitImages = [banana, blueberry, fujiapple, honeycrispapple, lemon, mango, peach, raspberry, tangerine, watermelon]
  const sortByArr = ["Alphabetical", "Price"]
  const products = useSelector((state) => state.products);
  const [categoryList, updateCategoryList] = useState(0)
  const dispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);


  function loadInitialData() {
    if (data) {
      var productArr = data.products
      var updatedProductArr = productArr.map(element => {
        return { ...element, imageLink: fruitImages.filter(fruit => fruit.includes(element.name.toLowerCase().replace(' ', '')) === true) }
      })
      // eslint-disable-next-line
      dispatch({
        type: UPDATE_PRODUCTS,
        products: updatedProductArr,
      });
    }
  }

  useEffect(() => {
    return loadInitialData()
     // eslint-disable-next-line
  }, [data, loading, dispatch]);

  useEffect(() => {
    var allCategories = []
    products.forEach((element) => {
      if (allCategories.indexOf(element.categories[0].name) === -1) {
        allCategories.push(element.categories[0].name)
      }
    })

    return updateCategoryList(allCategories)
  }, [products])

  function sortBy(e) {
    const sortedParam = e.target.innerHTML
    var unsorted = []
    const sortedProducts = []

    if (sortedParam === sortByArr[0]) {
      products.forEach(element => {
        unsorted.push(element.name)
      })
      unsorted.sort()
      unsorted.forEach(element => {
        products.forEach(item => {
          if (item.name === element) {
            sortedProducts.push(item)
          }
        })
      })
    }
    if (sortedParam === sortByArr[1]) {
      products.forEach(element => {
        unsorted.push(element.price)
      })
      unsorted.sort()
      unsorted.forEach(element => {
        products.forEach(item => {
          if (item.price === element) {
            sortedProducts.push(item)
          }
        })
      })
    }
    dispatch({
      type: UPDATE_PRODUCTS,
      products: sortedProducts,
    });
  }


  function filterItem(e) {
    const filterCategory = e.target.innerHTML
    if (filterCategory === 'Reset') {
      return loadInitialData()
    }
    var filteredCategories = []
    products.forEach(element => {
      if (element.categories[0].name === filterCategory) {
        filteredCategories.push(element)
      }
    })
    dispatch({
      type: UPDATE_PRODUCTS,
      products: filteredCategories,
    });
  }

  if (!products?.length) {
    return <Loading/>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-button-dark" variant="secondary">
              Category
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              {categoryList ? (categoryList.map((product) => {
                return (<Dropdown.Item key={product} onClick={filterItem} >{product}</Dropdown.Item>)
              })) : null}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-button-dark" variant="secondary">
              Sort By
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              {sortByArr ? (sortByArr.map((type) => {
                return (
                  <Dropdown.Item key={type} onClick={sortBy} >
                    <Row>
                      <Col>
                        {type}
                      </Col>
                    </Row>
                  </Dropdown.Item>)
              })) : null}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
        <Button onClick={filterItem}>Reset</Button>
        </Col>
      </Row>
      <Row>
        {products.map((product) => {
          return (
            <SingleProduct
              key={product._id}
              _id={product._id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              unit={product.unit}
              categories={product.categories}
              imageLink={product.imageLink}
            />
          );
        })}
      </Row>
    </Container>
  );
}

export default Products;
