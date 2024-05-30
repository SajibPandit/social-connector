import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";
import toast from "react-hot-toast";
import axios from "axios";

function CompleteTaskModal({ show, handleClose, proofId, setRefetch, data }) {
  const { user } = useContext(UserContext);

  const handleComplete = async () => {
    //persing data form local storage
    const storedUser = localStorage.getItem("zozoAuth");
    const parsedData = JSON.parse(storedUser);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/job-status`,
        {
          user_id: parsedData.id,
          status: 3,
          id: proofId,
        },
        {
          headers: {
            authorization: `Bearer ${parsedData.token}`,
          },
        }
      );

      //Update user point transcation value
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/point-transaction`,
        {
          from_id: data?.user_id,
          user_id: data?.user_id,
          point: data?.task?.amount,
          note: `Got ${data?.task?.amount} point for successfull proof of post id - ${data?.task?.id}`,
          type: 1,
        },
        {
          headers: {
            authorization: `Bearer ${parsedData.token}`,
          },
        }
      );

      handleClose();
      toast.success("Proof accepted");
      setRefetch(true);
    } catch (error) {
      toast.success(error.response.data.message);
      handleClose();
    }
  };
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
        <Button variant="secondary" onClick={handleComplete}>
          Yes, Complete It
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CompleteTaskModal;
