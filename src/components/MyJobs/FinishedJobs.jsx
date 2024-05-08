import React from "react";
import { allPosts } from "../../utils/data";
import { Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FinishedJobs() {
  const navigate = useNavigate();
  return (
    <div>
      <Row className="mt-4">
        <Col md={12} className="mb-2">
          <Table striped responsive="md" bordered hover>
            <thead>
              <tr>
                <th>Job Id</th>
                <th>Title</th>
                <th>Payment</th>
                <th>Done</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {allPosts.map((post, i) => (
                <tr
                  key={i}
                  className="cursor-pointer my-5"
                  onClick={() => navigate(`/post/${post.done}`)}>
                  <td>{post.done}</td>
                  <td>{post.title}</td>
                  <td>{post.payment}</td>
                  <td>
                    {post.done} / {post.total}
                  </td>
                  <td>Done</td>
                  <td>10 Min Ago</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default FinishedJobs;
