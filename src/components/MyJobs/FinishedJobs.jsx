import React, { useEffect, useState } from "react";
import { allPosts } from "../../utils/data";
import { Col, Pagination, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getStatusLabel } from "../../utils/getStatusLabel";
import axios from "axios";

function FinishedJobs() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1 });
  const [page, setPage] = useState(1);

  const queryParams = new URLSearchParams();
  const filterData = async () => {
    if (page) {
      queryParams.append("page", page);
    }
    queryParams.append("status", 4);
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
  }, [page]);
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
              {data.map((post, i) => (
                <tr
                  key={i}
                  className="cursor-pointer my-5"
                  onClick={() => navigate(`/post/${post.id}`)}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.amount}</td>
                  <td>
                    {post.completed} / {post.quantity}
                    {/* 50/100 */}
                    {/* <ProgressBar now={60} label={`${60}%`} /> */}
                  </td>
                  <td>{getStatusLabel(post.status)}</td>
                  <td>{moment(post.updated_at).fromNow()}</td>
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
    </div>
  );
}

export default FinishedJobs;
