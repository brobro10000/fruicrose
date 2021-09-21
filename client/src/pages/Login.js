import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import ModalObject from '../components/ModalObject'
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { UPDATE_LOGIN } from '../utils/actions';
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
function Login() {
    const isOpen = useSelector(state => state.currentForm)
    const [show, setShow] = useState(isOpen);
    const [type, setType] = useState(0)
    const dispatch = useDispatch()
    const handleShow = (e) => {
        if(e.target.innerHTML === 'Log In'){
            setType(0)
        } else if(e.target.innerHTML === 'Sign Up'){
            setType(1)
        }
        setShow(true)
            dispatch({
                type: UPDATE_LOGIN,
                currentForm: show,
            })
            console.log(isOpen)  
            return type
    };
    useEffect(() => {
        dispatch({
            type: UPDATE_LOGIN,
            currentForm: show,
        })
    },[show])

    return (
        <Container>
            <Row>
                <Col>
            <Button variant="primary" onClick={handleShow}>
                Log In
            </Button>
            </Col>
            <Col>
            <Button variant="primary" onClick={handleShow}>
                Sign Up
            </Button>
            </Col>
            </Row>
            <ModalObject type = {type}/>
        </Container>
    )
}

export default Login
