import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Spinner, Stack } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FaHandPointRight } from "react-icons/fa";
import axios from "axios";
import CompleteTaskModal from "../../components/Modal/CompleteTaskModal";
import RejectTaskModal from "../../components/Modal/RejectTaskModal";

function ProofDetails() {
  const [data, setData] = useState({});
  const [review, setReview] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  //Reject Modal State
  const [showReject, setShowReject] = useState(false);
  const handleRejectClose = () => setShowReject(false);
  const handleRejectShow = () => setShowReject(true);

  //Complete Modal State
  const [showComplete, setShowComplete] = useState(false);
  const handleCompleteClose = () => setShowComplete(false);
  const handleCompleteShow = () => setShowComplete(true);

  // Fetch data when component mounts
  useEffect(() => {
    setData({ ...data, task_id: id });
    const storedUser = localStorage.getItem("zozoAuth");
    const parsedData = JSON.parse(storedUser);

    const fetchPost = async () => {
      try {
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/my-task/${id}`, {
            headers: {
              Authorization: `Bearer ${parsedData.token}`,
            },
          })
          .then((res) => {
            setData(res.data.data);
          });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
    console.log("dgeeergre", data);
  }, [id]);

  return (
    <motion.div
      className="post-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}>
      <Container>
        {!data ? (
          <>
            <div className="text-center my-5">
              <Spinner animation="border" />
            </div>
          </>
        ) : (
          <>
            <div className="post-top d-flex justify-content-between align-items-center my-3">
              <div className="title-data px-2 px-md-0">
                <h4>{data?.title}</h4>
                <p className="text-muted">Wordwide</p>
              </div>
              <div className="data-ammount-data">
                <h4 className="text-muted">{data.amount}$</h4>
              </div>
            </div>
            <hr />
            {/* <div className="data-action-buttons d-flex justify-content-between align-items-center my-3 gap-3">
              <div className="job-rules">
                <Button variant="outline-dark" onClick={handleRulesShow}>
                  Job Rules
                </Button>
              </div>

              <div className="data-actions d-flex justify-content-between align-items-center gap-3">
                <div className="report-job">
                  <Button variant="outline-warning" onClick={handleReportShow}>
                    Report This Job
                  </Button>
                </div>
                <div className="hide-job">
                  <Button variant="outline-danger" onClick={handleHideJobShow}>
                    Hide Job
                  </Button>
                </div>
              </div>
            </div> */}
            <Card className="p-1">
              <Card.Body>
                <div className="row">
                  <div className="col-sm-6 col-md-4">
                    <div className="items">
                      <h6>Employer</h6>
                      <p className="text-muted cursor-pointer">
                        Sajib{" "}
                        <Link to={`/profile/${data.created_by}`}>
                          <span className="mx-3">
                            <BsBoxArrowUpRight />
                          </span>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="col-0 col-md-4"></div>
                  <div className="col-sm-6 col-md-4">
                    <div className="items">
                      <h6>Done</h6>
                      <p className="text-muted">{`${data.completed} of ${data.quantity}`}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-4">
                    <div className="items">
                      <h6>Job ID</h6>
                      <p className="text-muted">{data.id}</p>
                    </div>
                  </div>
                  <div className="col-0 col-md-4"></div>
                  <div className="col-sm-6 col-md-4">
                    <div className="items">
                      <h6>Deadline</h6>
                      <p className="text-muted">{data?.deadline}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-4">
                    <div className="items">
                      <h6>Category</h6>
                      <p className="text-muted">Youtube</p>
                    </div>
                  </div>
                  <div className="col-0 col-md-4"></div>
                  <div className="col-sm-6 col-md-4">
                    <div className="items">
                      <h6>Sub Category</h6>
                      <p className="text-muted">Subscriber</p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card
              style={{ backgroundColor: "#eee" }}
              className="d-flex justify-content-center align-items-start mt-3 py-3">
              <p className="my-auto px-4">
                {" "}
                <span className="mx-3">
                  <FaHandPointRight />
                </span>
                What is expected from workers?
              </p>
            </Card>
            <div className="data-description pt-3">
              <p className="text-justify">{data?.description}</p>
            </div>
            <Card
              className="d-flex justify-content-center align-items-start mt-3 py-3"
              style={{ backgroundColor: "#eee" }}>
              <p className="my-auto px-4">
                <span className="mx-3">
                  <FaHandPointRight />
                </span>
                Submit your proofs below
              </p>
            </Card>
            <>
              {data?.proof?.map((item, i) => (
                <div key={i} className="my-3">
                  <h5 className="text-muted">{item.title}</h5>
                  {item.type === "text" ? (
                    <Form.Group className="my-3" controlId={`textarea_${i}`}>
                      <Form.Control
                        size="lg"
                        as="textarea"
                        rows={3}
                        value={item.title}
                        disabled
                      />
                    </Form.Group>
                  ) : (
                    <>
                      <img
                        width="100%"
                        className="m-auto mb-3 img-fluid rounded responsive-image"
                        height={30}
                        src={
                          item?.image
                            ? `${import.meta.env.VITE_IMAGES_URL}/${
                                item?.image
                              }`
                            : "https://i.ibb.co/4g2RtSS/abstract-blue-geometric-shapes-background-1035-17545.webp"
                        }
                        alt="hotel"
                      />
                    </>
                  )}
                </div>
              ))}
            </>
            <div className="action-buttons d-flex justify-content-between align-items-center flex-column flex-md-row gap-3 py-4">
              <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                Go Back
              </Button>
              <Stack direction="horizontal" gap={3}>
                <Button variant="success" onClick={handleRejectShow}>
                  Reject This Task
                </Button>
                <Button variant="success" onClick={handleCompleteShow}>
                  Complete This Task
                </Button>
              </Stack>
            </div>
          </>
        )}
        <CompleteTaskModal
          show={showComplete}
          handleClose={handleCompleteClose}
          proofId={id}
        />
        <RejectTaskModal
          show={showReject}
          handleClose={handleRejectClose}
          proofId={id}
        />
      </Container>
    </motion.div>
  );
}

export default ProofDetails;
