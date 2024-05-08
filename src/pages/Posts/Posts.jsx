import { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { motion } from "framer-motion";
import ProgressBar from "react-bootstrap/ProgressBar";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import { allPosts } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

function Posts() {
  const [data, setData] = useState({});
  const [allCountry, setAllCountry] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [allTask, setAllTask] = useState([]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate();

  // Access the context to get user data
  const { user } = useContext(UserContext);

  // Fetching categories and sub categories and countries data
  useEffect(() => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/category`).then((res) => {
        setAllCategory(res?.data?.data);
      });

      axios.get(`${import.meta.env.VITE_BACKEND_URL}/country`).then((res) => {
        setAllCountry(res?.data?.data);
      });
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks`).then((res) => {
        setAllTask(res?.data?.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Fetch subcategories based on selected category
  useEffect(() => {
    try {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/subcategory/${data.category_id}`
        )
        .then((res) => {
          setAllSubCategory(res?.data?.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [data.category_id]);
  const queryParams = new URLSearchParams();
  const filterData = async (sortBy = "") => {
    // setIsLoading(true); // Set loading state to true

    if (data?.category_id) {
      queryParams.append("category", data?.category_id);
    }
    if (data?.task_type) {
      queryParams.append("subcategory", data?.task_type);
    }
    if (data?.location) {
      queryParams.append("location", data?.location);
    }
    if (data?.search) {
      queryParams.append("search", data?.search);
    }
    if (data?.sortBy) {
      queryParams.append("sortBy", data?.sortBy);
    }

    console.log(queryParams.toString());

    // try {
    //   axios
    //     .get(
    //       `${import.meta.env.VITE_BACKEND_URL}/tasks?${queryParams.toString()}`
    //     )
    //     .then((res) => {
    //       setFilterTasks(res?.data?.data);
    //     });
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // } finally {
    //   // setIsLoading(false); // Set loading state back to false
    // }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}>
      <Container>
        <Row>
          <Col
            md={12}
            className="d-flex justify-content-between align-items-center flex-column flex-md-row mt-3">
            <div className="d-flex gap-3">
              <Card className="p-1">
                <Form.Group
                  controlId="formBasicEmail"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Form.Label></Form.Label>
                  <div
                    style={{ margin: "1px solid #ddd" }}
                    className="p-2 p-0 p-md-2">
                    Earned Point :{" "}
                    {user?.point !== undefined ? user?.point : "--"}
                  </div>
                </Form.Group>
              </Card>

              <Card className="p-1">
                <Form.Group
                  controlId="formBasicEmail"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Form.Label></Form.Label>
                  <div
                    style={{ margin: "1px solid #ddd" }}
                    className="p-2 p-0 p-md-2">
                    Pending Point : 0.00
                  </div>
                </Form.Group>
              </Card>
            </div>
            <div>
              <Form.Group
                as={Col}
                md={12}
                controlId="formGender"
                className="mt-2 mb-2">
                <Form.Select
                  size="lg"
                  aria-label="Default select example"
                  value={data?.sortBy}
                  onChange={(e) =>
                    setData({ ...data, sortBy: e.target.value })
                  }>
                  <option>Sort By</option>
                  <option value="mostRecent">Most Recent</option>
                  <option value="oldPosts">Old Posts</option>
                </Form.Select>
              </Form.Group>
            </div>
          </Col>
        </Row>
        <Row className="mt-3" direction="horizontal" gap={3}>
          <Col md={3} sm={6} className="mt-3 mt-md-0">
            <Form.Group controlId="formGender">
              <Form.Select
                size="lg"
                aria-label="Default select example"
                value={data?.category_id}
                onChange={(e) =>
                  setData({ ...data, category_id: e.target.value })
                }>
                <option value="">Select Category</option>
                {allCategory?.map((category, i) => (
                  <option key={i} value={category.id}>
                    {category?.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3} sm={6} className="mt-3 mt-md-0">
            <Form.Group controlId="formGender">
              <Form.Select
                size="lg"
                aria-label="Default select example"
                value={data?.task_type}
                disabled={!data.category_id}
                onChange={(e) =>
                  setData({ ...data, task_type: e.target.value })
                }>
                <option value="">Select Sub Category</option>
                {allSubCategory?.map((category, i) => (
                  <option key={i} value={category.id}>
                    {category?.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2} sm={6} className="mt-3 mt-md-0">
            <Form.Group controlId="formGender">
              <Form.Select
                size="lg"
                aria-label="Default select example"
                value={data?.location}
                onChange={(e) =>
                  setData({ ...data, location: e.target.value })
                }>
                <option>Select Location</option>
                {allCountry.map((option, i) => (
                  <option key={i} value={option?.id}>
                    {option?.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3} sm={6} className="mt-3 mt-md-0">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Search"
                value={data?.search}
                onChange={(e) => setData({ ...data, location: e.target.value })}
              />
            </Form.Group>
          </Col>

          <Col
            md={1}
            className="mt-3 mt-md-0 d-flex justify-content-end align-items-center ">
            <Button onClick={filterData} size="lg">
              <IoMdSearch />
            </Button>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={12} className="mb-2">
            <Table striped responsive="md" bordered hover>
              <thead>
                <tr>
                  <th>Job Id</th>
                  <th>Title</th>
                  <th>Payment</th>
                  <th>Done</th>
                  <th>Deadline</th>
                </tr>
              </thead>

              <tbody>
                {allTask.map((post, i) => (
                  <tr
                    key={i}
                    className="cursor-pointer my-5"
                    onClick={() => navigate(`/post/${post.id}`)}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.amount}</td>
                    <td>
                      {post.completed} / {post.quantity}
                    </td>
                    <td>{post.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* <Card>
              <Card.Body>
                <Card.Title>Subscribe to our youtube channel</Card.Title>
                <Row className="my-3">
                  <Col md={6} sm={0}></Col>
                  <Col md={6} sm={12}>
                    <div className="d-flex justify-content-between align-items-center gap-5">
                      <div className="price">$50</div>
                      <div className="button">
                        <Button variant="primary">Complete this task</Button>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12}>
                    <div className="d-flex justify-content-between align-items-center gap-5">
                      <div className="country">Bangladesh</div>
                      <div className="remeaninmg">
                        <div>10 of 200 Remeaning</div>
                        <div>
                          <ProgressBar now={60} label={`${60}%`} />
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} sm={0}></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12} className="mb-2">
            <Card>
              <Card.Body>
                <Card.Title>Subscribe to our youtube channel</Card.Title>
                <Row className="my-3">
                  <Col md={6} sm={0}></Col>
                  <Col md={6} sm={12}>
                    <div className="d-flex justify-content-between align-items-center gap-5">
                      <div className="price">$50</div>
                      <div className="button">
                        <Button variant="primary">Complete this task</Button>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12}>
                    <div className="d-flex justify-content-between align-items-center gap-5">
                      <div className="country">Bangladesh</div>
                      <div className="remeaninmg">
                        <div>10 of 200 Remeaning</div>
                        <div>
                          <ProgressBar now={60} label={`${60}%`} />
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} sm={0}></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12} className="mb-2">
            <Card>
              <Card.Body>
                <Card.Title>Subscribe to our youtube channel</Card.Title>
                <Row className="my-3">
                  <Col md={6} sm={0}></Col>
                  <Col md={6} sm={12}>
                    <div className="d-flex justify-content-between align-items-center gap-5">
                      <div className="price">$50</div>
                      <div className="button">
                        <Button variant="primary">Complete this task</Button>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12}>
                    <div className="d-flex justify-content-between align-items-center gap-5">
                      <div className="country">Bangladesh</div>
                      <div className="remeaninmg">
                        <div>10 of 200 Remeaning</div>
                        <div>
                          <ProgressBar now={60} label={`${60}%`} />
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} sm={0}></Col>
                </Row>
              </Card.Body>
            </Card> */}
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default Posts;
