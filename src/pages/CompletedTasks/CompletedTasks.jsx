import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import axios from "axios";
import { getStatusLabel } from "../../utils/getStatusLabel";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function CompletedTasks() {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [pagination, setPagination] = useState({ current_page: 1 });
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams();
  const filterData = async () => {
    if (sortBy) {
      queryParams.append("status", sortBy);
    }
    if (page) {
      queryParams.append("page", page);
    }
    try {
      //persing data form local storage
      const storedUser = localStorage.getItem("zozoAuth");
      const parsedData = JSON.parse(storedUser);
      axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/done-job?${queryParams.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${parsedData.token}`,
            },
          }
        )
        .then((res) => {
          setData(res?.data?.data?.data);
          const {
            first_page_url,
            last_page_url,
            links,
            current_page,
            last_page,
          } = res?.data?.data;
          setPagination({
            ...pagination,
            first_page_url,
            last_page_url,
            links,
            current_page,
            last_page,
          });
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  useEffect(() => {
    filterData();
  }, [sortBy, page]);

  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <div className="jobs-header d-flex justify-content-between align-items-center mb-2">
              <div className="total-result">{data.length} Results Found</div>
              <div className="jobs-filter">
                <Form.Group
                  as={Col}
                  md={12}
                  controlId="formGender"
                  className="mt-2 mb-2">
                  <Form.Select
                    aria-label="Default select example"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">Filter By</option>
                    <option value="0">Pending</option>
                    <option value="3">Finished</option>
                    <option value="2">Under Review</option>
                    <option value="1">Rejected</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <Table striped responsive="md" bordered hover>
              <thead>
                <tr>
                  <th>Job Id</th>
                  <th>User Id</th>
                  <th>Title</th>
                  <th>Payment</th>
                  <th>Done</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {data.map((post, i) => (
                  <tr key={i} className="cursor-pointer my-5">
                    <td>{post.id}</td>
                    <td>{post?.user_id}</td>
                    <td className="text-nowrap">{post.task.title}</td>
                    <td>{post.inroll_point}P</td>
                    <td className="text-nowrap">
                      {post.task.completed} / {post.task.quantity}
                    </td>
                    <td>{getStatusLabel(post.status)}</td>
                    <td className="text-nowrap">
                      {moment(post.updated_at).fromNow()}
                    </td>
                    <td className="text-nowrap">
                      <Button
                        variant="outline-secondary"
                        onClick={() => navigate(`/proof/${post.id}`)}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <>
                    <p className="py-3 text-danger text-blod">No Tasks Found</p>
                  </>
                )}
              </tbody>
            </Table>

            <Pagination className="py-md-0 py-3">
              <Pagination.First
                onClick={() => setPage(1)}
                data-toggle="tooltip"
                data-placement="left"
                title="Jump to First Page"
              />
              <Pagination.Prev
                onClick={() => setPage(page > 1 ? page - 1 : 1)}
                disabled={page === 1}
              />
              {Array.from({ length: pagination?.last_page }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === page}
                  onClick={() => setPage(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() =>
                  setPage(
                    page < pagination?.last_page
                      ? page + 1
                      : pagination?.last_page
                  )
                }
                disabled={page === pagination?.last_page}
              />
              <Pagination.Last
                onClick={() => setPage(pagination?.last_page)}
                data-toggle="tooltip"
                data-placement="right"
                title="Jump to Last Page"
              />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CompletedTasks;
