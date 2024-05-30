import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import profileImage from "../../assets/default_profile.png";

function UserProfile() {
  const { id } = useParams(); // Get the id parameter from the URL
  const navigate = useNavigate();

  const [country, setCountry] = useState({});
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user-profile/${id}`)
      .then((res) => {
        setData(res?.data?.data);
        console.log(res?.data?.data);
      });
  }, [id]);

  useEffect(() => {
    console.log("dada", data);
  }, [data]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}>
      <Container>
        <Row className="my-3">
          <Col md={4}>
            <Card className="p-3">
              <Row className="d-flex justify-content-center align-items-center">
                <Col md={6} className="text-center">
                  <Image
                    className="img-fluid my-3"
                    src={data.avatar ? data.avatar : profileImage}
                    rounded
                  />
                </Col>
              </Row>

              <p className="text-center">{data?.name}</p>
              <p className="text-center text-lead">{data?.email}</p>
              <p className="text-center">{data?.country?.name}</p>

              <Row className="my-3">
                <Col md={6}>
                  <p className="text-center text-muted">Member Since</p>
                  <p className="text-center ">
                    {moment(data?.created_at).format("LL")}
                  </p>
                </Col>
                <Col md={6}>
                  <p className="text-center text-muted">Total Point</p>
                  <p className="text-center">
                    {data?.point ? data?.point : "--"}
                  </p>
                </Col>

                <Col md={6}>
                  <p className="text-center text-muted">Total Spend</p>
                  <p className="text-center">{data?.spend}</p>
                </Col>

                <Col md={6}>
                  <p className="text-center text-muted">User Id</p>
                  <p className="text-center">{data.id}</p>
                </Col>
              </Row>

              <Button
                onClick={() => navigate("/referals")}
                className="w-full m-3">
                Refer and Earn
              </Button>
            </Card>
          </Col>

          <Col md={8}>
            <h4 className="text-center mt-3">Your Interactions</h4>
            <Row className="">
              <Col md={3} className="mt-4 px-5 px-md-3">
                <Card
                  className="p-4 d-flex justify-content-center align-items-center shadow"
                  style={{ height: "150px" }}>
                  <div className="card-contents">
                    <p className="text-center">{data?.task_count}</p>
                    <p className="text-muted text-center">Total Tasks</p>
                  </div>
                </Card>
              </Col>

              <Col md={3} className="mt-4 px-5 px-md-3">
                <Card
                  className="p-4 d-flex justify-content-center align-items-center shadow"
                  style={{ height: "150px" }}>
                  <div className="card-contents">
                    <p className="text-center">
                      {data?.inroll_count !== undefined
                        ? data?.inroll_count
                        : "--"}
                    </p>
                    <p className="text-muted text-center">Task Completed</p>
                  </div>
                </Card>
              </Col>
              <Col md={3} className="mt-4 px-5 px-md-3">
                <Card
                  className="p-4 d-flex justify-content-center align-items-center shadow"
                  style={{ height: "150px" }}>
                  <div className="card-contents">
                    <p className="text-center">
                      {data?.used_refer !== null ? data?.used_refer : "--"}
                    </p>
                    <p className="text-muted text-center">Total Refer</p>
                  </div>
                </Card>
              </Col>

              <Col md={3} className="mt-4 px-5 px-md-3">
                <Card
                  className="p-4 d-flex justify-content-center align-items-center shadow"
                  style={{ height: "150px" }}>
                  <div className="card-contents">
                    <p className="text-center">
                      {data?.refer_code !== null ? data?.refer_code : "--"}
                    </p>
                    <p className="text-muted text-center">User Refer Code</p>
                  </div>
                </Card>
              </Col>

              <Tabs
                defaultActiveKey="freelancerProfile"
                id="fill-tab-example"
                className="mt-4 mx-3"
                variant="underline"
                justify>
                <Tab eventKey="freelancerProfile" title="Freelancer Profile">
                  <Card className="p-2 my-3">
                    <Card.Body>
                      <div className="card-items">
                        <div className="per-item">
                          <div className="item-title">Tasks Done</div>
                          <div className="item-number">0</div>
                        </div>

                        <div className="per-item">
                          <div className="item-title">Earned</div>
                          <div className="item-number">0</div>
                        </div>

                        <div className="per-item">
                          <div className="item-title">Satisfied</div>
                          <div className="item-number">0</div>
                        </div>

                        <div className="per-item">
                          <div className="item-title">Earned/Task</div>
                          <div className="item-number">0</div>
                        </div>

                        <div className="per-item">
                          <div className="item-title">Not Satisfied</div>
                          <div className="item-number">0</div>
                        </div>

                        <div className="per-item">
                          <div className="item-title">Last Task Submitted</div>
                          <div className="item-number">0</div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab>
                <Tab eventKey="buyerProfile" title="Buyer Profile">
                  <Card className="p-2 my-3">
                    <Card.Body>
                      <div className="card-items">
                        <div className="per-item">
                          <div className="item-title">Tasks Done</div>
                          <div className="item-number">0</div>
                        </div>

                        <div className="per-item">
                          <div className="item-title">Earned</div>
                          <div className="item-number">0</div>
                        </div>

                        <div className="per-item">
                          <div className="item-title">Satisfied</div>
                          <div className="item-number">0</div>
                        </div>

                        <div className="per-item">
                          <div className="item-title">Earned/Task</div>
                          <div className="item-number">0</div>
                        </div>

                        <div className="per-item">
                          <div className="item-title">Not Satisfied</div>
                          <div className="item-number">0</div>
                        </div>

                        <div className="per-item">
                          <div className="item-title">Last Task Submitted</div>
                          <div className="item-number">0</div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab>
                {/* <Tab
                    eventKey="freelancerProfileGigs"
                    title="Freelancer Profile(Gigs)"></Tab>
                  <Tab
                    eventKey="buyerProfileGigs"
                    title="Buyer Profile(Gigs)"></Tab> */}
              </Tabs>
            </Row>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default UserProfile;
