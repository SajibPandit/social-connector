import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";

function JobRulesModal({ show, handleClose }) {
  const { user } = useContext(UserContext);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title>Jobe Rules</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        <ol>
          <li>consequatur voluptas fugit itaque</li>
          <li>doloremque error dignissimos hic</li>
          <li> quibusdam minima ducimus accusamus</li>
          <li>minus natus sequi veritatis</li>
        </ol>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Got It
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default JobRulesModal;
