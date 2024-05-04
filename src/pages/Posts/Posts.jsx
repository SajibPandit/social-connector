import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import ProgressBar from "react-bootstrap/ProgressBar";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";

function Posts() {
  const [data, setData] = useState({});
  const [allCountry, setAllCountry] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((res) => {
      setAllCountry(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Container>
        <Row className="mt-3" direction="horizontal" gap={3}>
          <Col md={3} sm={6} className="mt-3 mt-md-0">
            <Form.Group controlId="formGender">
              <Form.Select
                size="lg"
                aria-label="Default select example"
                value={data?.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
              >
                <option>Select Category</option>
                <option value="facebook">Facebook</option>
                <option value="youtube">Youtube</option>
                <option value="instagram">Instagram</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3} sm={6} className="mt-3 mt-md-0">
            <Form.Group controlId="formGender">
              <Form.Select
                size="lg"
                aria-label="Default select example"
                disabled={!data.category}
                value={data?.subCategory}
                onChange={(e) =>
                  setData({ ...data, subCategory: e.target.value })
                }
              >
                <option>Select Sub Category</option>
                <option value="facebook">Facebook</option>
                <option value="youtube">Youtube</option>
                <option value="instagram">Instagram</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2} sm={6} className="mt-3 mt-md-0">
            <Form.Group controlId="formGender">
              <Form.Select
                size="lg"
                aria-label="Default select example"
                value={data?.location}
                onChange={(e) => setData({ ...data, location: e.target.value })}
              >
                <option>Select Location</option>
                {allCountry &&
                  allCountry.map((option) => (
                    <option value="facebook" key={option?.name}>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          width={30}
                          height={20}
                          src={option?.flags?.png}
                          alt="flag"
                        />
                        <p>{option?.name}</p>
                      </div>
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            {/* <Form.Group controlId="formBasicEmail">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter location"
                value={data?.location}
                onChange={(e) => setData({ ...data, location: e.target.value })}
              />
            </Form.Group> */}
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
            className="mt-3 mt-md-0 d-flex justify-content-end align-items-center "
          >
            <Button size="lg">
              <IoMdSearch />
            </Button>
          </Col>
        </Row>

        <Row>
          <Col
            md={12}
            className="d-flex justify-content-between align-items-center flex-row mt-3"
          >
            <div className="d-flex gap-3">
              <Card className="p-1">
                <Form.Group
                  controlId="formBasicEmail"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Form.Label></Form.Label>
                  <div
                    style={{ margin: "1px solid #ddd" }}
                    className="p-0 p-md-2"
                  >
                    Earned Point : 0.00
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
                  }}
                >
                  <Form.Label></Form.Label>
                  <div
                    style={{ margin: "1px solid #ddd" }}
                    className="p-2 p-0 p-md-2"
                  >
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
                className="mt-2 mb-2"
              >
                <Form.Select
                  size="lg"
                  aria-label="Default select example"
                  value={data?.sortBy}
                  onChange={(e) => setData({ ...data, sortBy: e.target.value })}
                >
                  <option>Sort By</option>
                  <option value="mostRecent">Most Recent</option>
                  <option value="oldPosts">Old Posts</option>
                </Form.Select>
              </Form.Group>
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
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
        </Row>
      </Container>
    </motion.div>
  );
}

export default Posts;
