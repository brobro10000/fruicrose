import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function Dashboard() {
    const {data} = useQuery(QUERY_USER);
    let user;

    if(data) {
        user = data.user;
    }
    console.log(user);
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard;