import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function Dashboard() {
    const { loading, data } = useQuery(QUERY_USER);
    let user;
    
    if(data) {
        user = data.user; 
    }
    
    return (
        <div>Hello {user.username}!</div>
    )
}

export default Dashboard;