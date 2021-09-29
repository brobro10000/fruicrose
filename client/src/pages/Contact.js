import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Form, Button, Container } from 'react-bootstrap'
import { validateEmail, capitalizeFirstLetter } from '../utils/helpers';

function Contact() {
    const [state, handleSubmit] = useForm("xyylldzy");
    const [errorMessage, setErrorMessage] = useState('');

    if (state.succeeded) {
        return <p id='returnMessage'>We Received your Message!</p>;
    }
    function stage1Error(e) {
        if (e.target.value === '')
            return setErrorMessage(capitalizeFirstLetter(e.target.name) + " is required")
        if (e.target.name === 'email') {
            const isValid = validateEmail(e.target.value);
            // isValid conditional statement
            if (!isValid) {
                setErrorMessage('Email is Invalid');
            } else {
                setErrorMessage('');
            }
        } else {
            if (e.target.value === '')
                return setErrorMessage(capitalizeFirstLetter(e.target.name) + " is required")
        }
    }
    return (
        <Container id='formContainer' className='formContainer'>
            <h1 style={{textAlign:'center', margin: '30px'}}>Questions? Leave us a message!</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label className='form-labels' htmlFor="name">
                        Full Name
                    </Form.Label>
                    <Form.Control
                        placeholder={errorMessage && errorMessage.split(' ')[0] === 'Name' ? errorMessage : ''}
                        id="name"
                        type="name"
                        name="name"
                        onBlur={stage1Error}
                    />
                    <ValidationError
                        prefix="name"
                        field="name"
                        errors={state.errors}
                    />
                    <Form.Label className='form-labels' htmlFor="email">
                        Email Address
                    </Form.Label>
                    <Form.Control
                        placeholder={errorMessage && errorMessage.split(' ')[0] === 'Email' ? errorMessage : ''}
                        id="email"
                        type="email"
                        name="email"
                        onBlur={stage1Error}
                    />
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                    />
                    <Form.Label className='form-labels' htmlFor="message">
                        Message
                    </Form.Label>
                    <Form.Control
                        as='textarea'
                        placeholder={errorMessage && errorMessage.split(' ')[0] === 'Message' ? errorMessage : ''}
                        id="message"
                        name="message"
                        onBlur={stage1Error}
                    />
                    <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                    />
                    <Container className='buttonContainer'>
                        <Button className='submitButton' type="submit" disabled={state.submitting}>
                            Submit
                        </Button>
                    </Container>
                </Form.Group>
            </Form>
        </Container>
    );
}
export default Contact