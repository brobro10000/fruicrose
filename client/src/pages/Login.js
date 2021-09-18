import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'
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
        if(e.target.innerHTML == 'Log In'){
            setType(0)
            console.log(type)
        } else if(e.target.innerHTML = 'Sign Up'){
            setType(1)
            console.log(type)
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
            <Button variant="primary" onClick={handleShow}>
                Log In
            </Button>
            <ModalObject type = {type}/>
            <Button variant="primary" onClick={handleShow}>
                Sign Up
            </Button>
        </Container>
    )
}

export default Login
