import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

function RejectTaskModal({ show, handleClose, proofId, setRefetch }) {
  const [data, setData] = useState({});
  const { user } = useContext(UserContext);

  const handleReject = async () => {
    //persing data form local storage
    const storedUser = localStorage.getItem("zozoAuth");
    const parsedData = JSON.parse(storedUser);

    try {
      const responsedata = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/job-status`,
        {
          ...data,
          user_id: parsedData.id,
          status: 1,
          id: proofId,
        },
        {
          headers: {
            authorization: `Bearer ${parsedData.token}`,
          },
        }
      );
      toast.success("Proof rejected");
      setRefetch(true);
      handleClose();
    } catch (error) {
      toast.success(error.response.data.message);
      handleClose();
    }
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title>Reject This Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Enter reason why you want to reject this proof
          </Form.Label>
          <Form.Control
            size="lg"
            placeholder="Enter description"
            as="textarea"
            rows={3}
            value={data?.user_review}
            onChange={(e) => setData({ ...data, user_review: e.target.value })}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleReject}>
          Reject
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RejectTaskModal;
