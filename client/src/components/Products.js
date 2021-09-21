import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { QUERY_ALL_PRODUCTS } from '../utils/queries';

function Products() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);

    return (
        <div></div>
    )
}

export default Products;