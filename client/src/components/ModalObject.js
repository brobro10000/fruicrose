import React, { useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { UPDATE_LOGIN } from "../utils/actions";
import LoginForm from "./LoginForm";
import { useSelector, useDispatch } from "react-redux";
import SignupForm from "./SignupForm";
function ModalObject(props) {
  const isOpen = useSelector((state) => state.currentForm);
  const dispatch = useDispatch();
  const [show, setShow] = useState(isOpen);
  const handleClose = () => {
    setShow(false);
    dispatch({
      type: UPDATE_LOGIN,
      currentForm: show,
    });
  };
  return (
    <Container>
      <Modal
        className="modalBorder"
        id="modalObject"
        show={isOpen}
        onHide={handleClose}
      >
        <Modal.Header style={{ textAlign: "center" }}>
          <Modal.Title>
            {props.type === 0 ? "Login Here" : "Sign Up"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.type === 0 ? <LoginForm /> : <SignupForm />}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ModalObject;
