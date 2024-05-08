import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";

function HideJobModal({ show, handleClose }) {
  const { user } = useContext(UserContext);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title>Hide Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are sure to hide this job from you?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Yes, Hide It
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default HideJobModal;
