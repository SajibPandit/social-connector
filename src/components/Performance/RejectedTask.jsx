import React, { useEffect, useState } from "react";
import { allPosts } from "../../utils/data";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RejectedTask() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        //persing data form local storage
        const storedUser = localStorage.getItem("zozoAuth");
        const parsedData = JSON.parse(storedUser);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/my-task?status=1`,
          {
            headers: {
              Authorization: `Bearer ${parsedData.token}`,
            },
          }
        );
        setData(response?.data?.data.data);
        console.log(response?.data?.data?.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, []);
  return (
    <div>
      <Row className="mt-4">
        <Col md={12} className="mb-2">
          <Table striped responsive="md" bordered hover>
            <thead>
              <tr>
                <th>Job Id</th>
                <th>Title</th>
                <th>Payment Point</th>
                <th>Status</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((post, i) => (
                <tr
                  key={i}
                  className="cursor-pointer my-5"
                  onClick={() => navigate(`/post/${post.done}`)}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.inroll_point}</td>
                  <td>
                    {post.done} / {post.total}
                  </td>
                  <td>Rejected</td>
                  <td>{moment(post.created_at).fromNow()}</td>
                </tr>
              ))}
              {data.length === 0 && (
                <>
                  <p className="py-3 text-danger text-blod">No Tasks Found</p>
                </>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default RejectedTask;
