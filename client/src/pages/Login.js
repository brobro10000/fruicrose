import React from 'react';
import {Container} from 'react-bootstrap'
import ModalObject from '../components/ModalObject'
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
function Login() {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    return (
        
        <Container>
        {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
        </Button> */}
        <ModalObject renderState = {SignupForm,LoginForm}/>
        </Container>
    )
}

export default Login
