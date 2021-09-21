import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { QUERY_ALL_PRODUCTS } from '../utils/queries';

function Products() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products
            });
        }
    }, [data, loading, dispatch]);

    const products = state?.products || [];

    if (!products?.length) {
        return <h1>There are no products!</h1>;
      }

    return (
        <div>
            {products.map((product) => {
                <ol>
                    <li>{product.name}</li>
                </ol>
            })}
        </div>
    )
}

export default Products;