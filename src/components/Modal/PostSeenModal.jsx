import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FacebookEmbed, EmbeddedPost } from "react-social-media-embed";

function PostSeenModal({ show, setShow }) {
  const [enableClose, setEnableClose] = useState(false);

  // Function to close the modal
  const handleClose = () => setShow(false);
  const [seconds, setSeconds] = useState(30);

  // Function to update the countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(interval);
          setEnableClose(true);
        }
        return prevSeconds - 1;
      });
    }, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup function
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop={enableClose ? "true" : "static"}>
      <Modal.Header>
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This is the modal body.</p>
        <iframe
          width="100%"
          height="315"
          class="ytplayer"
          src="https://www.youtube.com/embed/dy3UCi1kusY?autoplay=1&controls=0&disablekb=1"
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>

        {/* <div style={{ display: "flex", justifyContent: "center" }}>
          <FacebookEmbed
            url="https://www.facebook.com/100044413150303/videos/ramadan-talks-building-a-brand-in-the-age-of-digital/539592210872131?autoplay=true"
            width={550}
          />
        </div> */}

        <p>Wait {seconds} seconds to close the modal</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={!enableClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PostSeenModal;
