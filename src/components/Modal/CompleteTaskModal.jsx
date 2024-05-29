import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";

function CompleteTaskModal({ show, handleClose }) {
  const { user } = useContext(UserContext);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title>Complete This Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to Complete this proof?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Yes, Complete It
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CompleteTaskModal;
