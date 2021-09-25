import {Container} from 'react-bootstrap'
import Loading from '../components/Loading'
function Success(){
    setTimeout(() => {
        console.log(window.location)
    },1000)
    return(
        <Container>
            <Loading/>
        </Container>
    )
}

export default Success