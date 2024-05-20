import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import PostSeenModal from "../../components/Modal/PostSeenModal";
import { FaHandPointRight } from "react-icons/fa";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { motion } from "framer-motion";
import TaskReportModal from "../../components/Modal/TaskReportModal";
import JobRulesModal from "../../components/Modal/JobRulesModal";
import HideJobModal from "../../components/Modal/HideJobModal";
import axios from "axios";

function PostDetails() {
  const [data, setData] = useState({});
  const { id } = useParams(); // Get the id parameter from the URL
  const [post, setPost] = useState(null);
  // const [show, setShow] = useState(false);

  //Report Modal State
  const [showReport, setShowReport] = useState(false);
  const handleReportClose = () => setShowReport(false);
  const handleReportShow = () => setShowReport(true);

  //Job Rules Modal State
  const [showRules, setShowRules] = useState(false);
  const handleRulesClose = () => setShowRules(false);
  const handleRulesShow = () => setShowRules(true);

  //Hide Job Modal State
  const [showHideJob, setShowHideJob] = useState(false);
  const handleHideJobClose = () => {
    setShowHideJob(false);
    navigate("/posts");
  };

  const handleHideJobShow = () => setShowHideJob(true);

  const navigate = useNavigate();

  // Fetch post data when component mounts
  useEffect(() => {
    setData({ ...data, task_id: id });

    const fetchPost = async () => {
      try {
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/task/view/${id}`)
          .then((res) => {
            setPost(res?.data?.data);
            setData({ ...data, proof: res?.data?.data?.proof });
          });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const proff = [
    {
      title: "Trigger effect when id changes",
      type: "screenshot",
      screenshot: "",
      text: "",
    },
    {
      title: "Trigger effect when id changes",
      type: "text",
      screenshot: "",
      text: "",
    },
    {
      title: "Trigger effect when id changes",
      type: "text",
      screenshot: "",
      text: "",
    },
    {
      title: "Trigger effect when id changes",
      type: "screenshot",
      screenshot: "",
      text: "",
    },
  ];

  const handleProof = async (e) => {
    e.preventDefault();

    //persing data form local storage
    const storedUser = localStorage.getItem("zozoAuth");
    const parsedData = JSON.parse(storedUser);

    let formData = new FormData();
    setData({ ...data, user_id: parsedData.id, task_id: id });

    formData.append("m", "er");
    for (let key in data) {
      console.log(key);
      if (Array.isArray(data[key])) {
        data[key].forEach((item, index) => {
          for (let subKey in item) {
            formData.append(`${key}[${index}][${subKey}]`, item[subKey]);
          }
        });
      } else {
        formData.append(key, data[key]);
      }
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
      for (let key in pair) {
        console.log(key + ": " + pair[key]);
      }
    }

    console.log(formData.getAll("user_id"), "useruddd");
    console.log(formData.getAll(`proof[0][image]`), "useruddd");
    console.log(formData);

    try {
      // Perform form submission logic here (sending data to server)
      console.log("submit data", {
        ...data,
        user_id: parsedData.id,
        task_id: id,
      });
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/task/inroll`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${parsedData.token}`,
          },
        }
      );
    } catch (error) {}
  };

  return (
    <motion.div
      className="post-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}>
      <Container>
        {!post ? (
          <>
            <div className="text-center my-5">
              <Spinner animation="border" />
            </div>
          </>
        ) : (
          <>
            <div className="post-top d-flex justify-content-between align-items-center my-3">
              <div className="title-data px-2 px-md-0">
                <h4>{post?.title}</h4>
                <p className="text-muted">Wordwide</p>
              </div>
              <div className="post-ammount-data">
                <h4 className="text-muted">{post.amount}$</h4>
              </div>
            </div>
            <hr />
            <div className="post-action-buttons d-flex justify-content-between align-items-center my-3 gap-3">
              <div className="job-rules">
                <Button variant="outline-dark" onClick={handleRulesShow}>
                  Job Rules
                </Button>
              </div>

              <div className="post-actions d-flex justify-content-between align-items-center gap-3">
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
            </div>
            <Card className="p-1">
              <Card.Body>
                <div className="row">
                  <div className="col-sm-6 col-md-4">
                    <div className="items">
                      <h6>Employer</h6>
                      <p className="text-muted cursor-pointer">
                        Sajib{" "}
                        <Link to={`/profile/${post.created_by}`}>
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
                      <p className="text-muted">{`${post.completed} of ${post.quantity}`}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-4">
                    <div className="items">
                      <h6>Job ID</h6>
                      <p className="text-muted">{post.id}</p>
                    </div>
                  </div>
                  <div className="col-0 col-md-4"></div>
                  <div className="col-sm-6 col-md-4">
                    <div className="items">
                      <h6>Deadline</h6>
                      <p className="text-muted">{post?.deadline}</p>
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
            <div className="post-description pt-3">
              <p className="text-justify">{post?.description}</p>
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
              {post?.proof?.map((item, i) => (
                <div key={i} className="my-3">
                  <h5 className="text-muted">{item.question}</h5>
                  {item.type === "text" ? (
                    <Form.Group className="my-3" controlId={`textarea_${i}`}>
                      <Form.Control
                        size="lg"
                        placeholder="Give answer"
                        as="textarea"
                        rows={3}
                        value={data?.proof[i]?.title || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            proof: {
                              ...data?.proof,
                              [i]: {
                                ...data.proof[i],
                                title: e.target.value,
                                image: "",
                              },
                            },
                          })
                        }
                      />
                    </Form.Group>
                  ) : (
                    <>
                      <img
                        width="100%"
                        className="m-auto  mb-3 img-fluid img-thumbnail rounded"
                        height={300}
                        src={
                          data?.proof[i]?.image instanceof File
                            ? URL.createObjectURL(data?.proof[i]?.image)
                            : "https://i.ibb.co/4g2RtSS/abstract-blue-geometric-shapes-background-1035-17545.webp"
                        }
                        alt="hotel"
                      />
                      <Form.Group className="my-3" controlId={`file_${i}`}>
                        <Form.Control
                          size="lg"
                          type="file"
                          onChange={(e) =>
                            setData({
                              ...data,
                              proof: {
                                ...data.proof,
                                [i]: {
                                  ...data.proof[i],
                                  image: e.target.files[0],
                                  title: "gggg",
                                },
                              },
                            })
                          }
                        />

                        {item.type === "screenshot" && data[i]?.image && (
                          <div className="my-3">
                            <h6>Preview:</h6>
                            <img
                              src={URL.createObjectURL(data[i]?.image)}
                              alt="Screenshot Preview"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "200px",
                              }}
                            />
                          </div>
                        )}
                      </Form.Group>
                    </>
                  )}
                </div>
              ))}

              {/* {Object.keys(post?.proof).map((key) => {
                const { question, type } = post.proof[key];
                return (
                  
                );
              })} */}
            </>
            <div className="action-buttons d-flex justify-content-between align-items-center py-4">
              <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                Go Back
              </Button>
              <Button variant="success" onClick={handleProof}>
                Submit Task
              </Button>
            </div>
          </>
        )}

        <TaskReportModal show={showReport} handleClose={handleReportClose} />
        <JobRulesModal show={showRules} handleClose={handleRulesClose} />
        <HideJobModal show={showHideJob} handleClose={handleHideJobClose} />
      </Container>
    </motion.div>
  );
}

export default PostDetails;
