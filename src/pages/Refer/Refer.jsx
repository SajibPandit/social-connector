import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

function Refer({ referModalShow, handleReferClose }) {
  const copyToClipboard = () => {
    const textToCopy = "https://example.com"; // Replace with your link
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Text copied to clipboard:", textToCopy);
        // Optionally, you can show a success message to the user
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
        // Optionally, you can show an error message to the user
      });
  };

  return (
    <Modal show={referModalShow} onHide={handleReferClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Refer Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>Refer to get Free Points</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleReferClose}>
          Close
        </Button>
        <Button variant="primary" onClick={copyToClipboard}>
          Click Here to Copy Link
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Refer;
