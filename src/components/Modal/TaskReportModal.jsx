import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";

function TaskReportModal({ show, handleClose }) {
  const [data, setData] = useState({});
  const { user } = useContext(UserContext);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title>Report This Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter reason why you want to report this job</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Enter description"
            as="textarea"
            rows={3}
            value={data?.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Report
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskReportModal;
