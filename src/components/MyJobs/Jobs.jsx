import React from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { allPosts } from "../../utils/data";

function Jobs() {
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <div className="jobs-header d-flex justify-content-between align-items-center mb-2">
              <div className="total-result">50 Results Found</div>
              <div className="jobs-filter">
                <Form.Group
                  as={Col}
                  md={12}
                  controlId="formGender"
                  className="mt-2 mb-2">
                  <Form.Select
                    aria-label="Default select example"
                    // value={data?.sortBy}
                    // onChange={(e) =>
                    //   setData({ ...data, sortBy: e.target.value })
                    // }
                  >
                    <option>Sort By</option>
                    <option value="running">Running Jobs</option>
                    <option value="finished">Finised Jobs</option>
                    <option value="incomplete">Incomplete Jobs</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

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
                      {/* 50/100 */}
                      {/* <ProgressBar now={60} label={`${60}%`} /> */}
                    </td>
                    <td>Done</td>
                    <td>10 Min Ago</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Jobs;
