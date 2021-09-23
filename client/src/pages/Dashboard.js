import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { UPDATE_USER } from '../utils/actions'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';

function Dashboard() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { loading, data } = useQuery(QUERY_USER);
    
    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_USER,
                user: data.user
            })}

        return() => {
            dispatch({
                type: UPDATE_USER,
                user: {}
            })}
    }, [loading, data, dispatch])
    
    return (
        <div>Hello {user.username}!</div>
    )
}

export default Dashboard;