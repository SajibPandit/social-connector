import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FacebookEmbed, EmbeddedPost } from "react-social-media-embed";

function PostSeenModal({ show, setShow }) {
  const [enableClose, setEnableClose] = useState(false);

  // Function to close the modal
  const handleClose = () => setShow(false);
  const [seconds, setSeconds] = useState(30);

  // // Automatically close the modal after 30 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setEnableClose(true);
  //   }, 30000); // 30 seconds
  //   return () => clearTimeout(timer); // Cleanup function
  // }, []);

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

  useEffect(() => {
    // Load Facebook SDK asynchronously
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1099585197818642",
        xfbml: true,
        version: "v11.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    // Trigger autoplay when Facebook SDK is ready
    window.fbAsyncInit();
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

        {/* <iframe
          src={`https://www.facebook.com/100044413150303/videos/facebook-reels-expression-update/505333595136542/`}
          width="100%"
          height="315"
          style={{ border: "none", overflow: "hidden" }}
          allowFullScreen="true"
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>*/}

        {/* <iframe
          src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F100044413150303%2Fvideos%2Ffacebook-reels-expression-update%2F505333595136542%2F&autoplay=1&mute=1"
          width="500"
          height="500"
          frameborder="0"
          autoplay="true"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen="true"></iframe>

        <video
          src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F100044413150303%2Fvideos%2Ffacebook-reels-expression-update%2F505333595136542%2F"
          controls></video> */}

        {/* <div style={{ display: "flex", justifyContent: "center" }}>
          <FacebookEmbed
            url="https://www.facebook.com/100044413150303/videos/ramadan-talks-building-a-brand-in-the-age-of-digital/539592210872131?autoplay=true"
            width={550}
          />
        </div> */}

        {/* <div style={{ display: "flex", justifyContent: "center" }}>
          <FacebookProvider appId="YOUR_APP_ID">
            <EmbeddedPost href={url} width={width} autoplay={true} />
          </FacebookProvider>
        </div> */}

        {/* <div
          class="fb-video"
          data-href="https://www.facebook.com/100044413150303/videos/ramadan-talks-building-a-brand-in-the-age-of-digital/539592210872131"
          data-width="500"
          data-allowfullscreen="true"
          data-autoplay="true"
          data-show-captions="true"></div>

        <div
          className="fb-video"
          data-autoplay="true"
          data-href="https://www.facebook.com/facebook/videos/10153231379946729/"
          data-width="500"
          data-show-text="false">
          <blockquote
            cite="https://www.facebook.com/facebook/videos/10153231379946729/"
            class="fb-xfbml-parse-ignore">
            <a href="https://www.facebook.com/facebook/videos/10153231379946729/">
              How to Share With Just Friends
            </a>
            <p>How to share with just friends.</p>Posted by{" "}
            <a href="https://facebook.com/facebook">Facebook</a> on Friday 5
            December 2014
          </blockquote>
        </div> */}

        <div
          className="fb-video"
          data-href="https://www.facebook.com/facebook/videos/10153231379946729/"
          data-width="500"
          data-show-text="false"
          data-autoplay="true"
          data-controls="false">
          {/* <blockquote
            cite="https://www.facebook.com/facebook/videos/10153231379946729/"
            className="fb-xfbml-parse-ignore">
            <a href="https://www.facebook.com/facebook/videos/10153231379946729/">
              How to Share With Just Friends
            </a>
            <p>How to share with just friends.</p>Posted by{" "}
            <a href="https://facebook.com/facebook">Facebook</a> on Friday,
            December 5, 2014
          </blockquote> */}
        </div>

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
