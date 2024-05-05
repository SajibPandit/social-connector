import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PostSeenModal from "../../components/Modal/PostSeenModal";

function PostDetails() {
  const { id } = useParams(); // Get the id parameter from the URL
  const [post, setPost] = useState(null);
  const [show, setShow] = useState(false);

  //   // Fetch post data when component mounts
  //   useEffect(() => {
  //     const fetchPost = async () => {
  //       try {
  //         setPost(postData); // Update state with fetched post data
  //       } catch (error) {
  //         console.error("Error fetching post:", error);
  //       }
  //     };

  //     fetchPost(); // Call the fetchPost function
  //   }, [id]); // Trigger effect when id changes

  return (
    <div className="post-detail">
      <Container>
        {post ? (
          <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {/* Render other details of the post */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        Post Post Post details page
        <Button onClick={() => setShow(true)}>Complete This Task</Button>
        <PostSeenModal show={show} setShow={setShow} />
      </Container>
    </div>
  );
}

export default PostDetails;
