import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaHandPointRight } from "react-icons/fa";
import { BsBoxArrowUpRight } from "react-icons/bs";
import TaskReportModal from "../../components/Modal/TaskReportModal";
import JobRulesModal from "../../components/Modal/JobRulesModal";
import HideJobModal from "../../components/Modal/HideJobModal";
import UserContext from "../../contexts/UserContext";

function PostDetails() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [errors, setErrors] = useState({});
  const { user } = useContext(UserContext);

  const validateForm = () => {
    const newErrors = {};
    data.proof.forEach((item, i) => {
      if (item.type === "text" && !item.title) {
        newErrors[`title_${i}`] = "This field is required";
      }
      if (item.type === "image" && !item.image) {
        newErrors[`image_${i}`] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
            console.log(res?.data?.data);
            setData({ ...data, proof: res?.data?.data?.proof, task_id: id });
          });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);
  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const handleProof = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      //persing data form local storage
      const storedUser = localStorage.getItem("zozoAuth");
      const parsedData = JSON.parse(storedUser);

      // let formData = new FormData();
      // setData({ ...data, user_id: parsedData.id, task_id: id });

      let formData = new FormData();
      formData.append("task_id", data.task_id);
      data.proof.forEach((item, index) => {
        formData.append(`proof[${index}][description]`, item.question);
        formData.append(`proof[${index}][type]`, item.type);
        formData.append(`proof[${index}][title]`, item.title);
        formData.append(`proof[${index}][image]`, item.image);
      });

      // Log the FormData content
      const formDataEntries = [];
      for (let pair of formData.entries()) {
        formDataEntries.push({ [pair[0]]: pair[1] });
      }
      console.log("FormData:", JSON.stringify(formDataEntries, null, 2));
      try {
        // Perform form submission logic here (sending data to server)
        console.log("submit data", {
          ...data,
          user_id: parsedData.id,
          task_id: id,
        });
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/task/inroll`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${parsedData.token}`,
            },
          }
        );
        toast.success(response.data.message);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  // Function to handle changes in the proof data
  const handleProofChange = (index, field, value) => {
    const updatedProof = [...data.proof]; // Create a copy of the proof array
    const updatedProofItem = { ...updatedProof[index], [field]: value }; // Update the specific proof item
    updatedProof[index] = updatedProofItem; // Update the proof array with the updated item
    setData({ ...data, proof: updatedProof }); // Update the state with the new proof array
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
                <p className="text-muted">
                  {post?.country.name ? post.country.name : "Worldwide"}
                </p>
              </div>
              <div className="post-ammount-data">
                <h4 className="text-muted">{post?.amount}$</h4>
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
                      <h6>Employer Profile</h6>
                      <p className="text-muted cursor-pointer">
                        {post?.created_by}{" "}
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
                      <p className="text-muted">{`${post?.completed} of ${post?.quantity}`}</p>
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
                      <p className="text-muted">{post?.category?.name}</p>
                    </div>
                  </div>
                  <div className="col-0 col-md-4"></div>
                  <div className="col-sm-6 col-md-4">
                    <div className="items">
                      <h6>Sub Category</h6>
                      <p className="text-muted">{post?.task_type?.name}</p>
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
            <div className="pt-3">
              <a
                href={post?.link}
                target="_blank"
                className="btn btn-block btn-outline-secondary w-100 w-md-50"
                rel="noopener noreferrer">
                Click Here to Go the Post Link
              </a>
            </div>
            {user?.id !== post?.created_by && (
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
            )}

            <>
              <div>
                {data.proof.map((item, i) => (
                  <div key={i} className="my-3">
                    <h5 className="text-muted">{item.question}</h5>
                    {item.type === "text" ? (
                      <Form.Group className="my-3" controlId={`textarea_${i}`}>
                        <Form.Control
                          required
                          size="lg"
                          placeholder="Give answer"
                          as="textarea"
                          disabled={user?.id === post?.created_by}
                          rows={3}
                          value={item.title || ""}
                          onChange={(e) =>
                            handleProofChange(i, "title", e.target.value)
                          }
                        />
                      </Form.Group>
                    ) : (
                      <>
                        <img
                          width="100%"
                          className="m-auto mb-3 img-fluid rounded responsive-image"
                          height={30}
                          src={
                            item.image instanceof File
                              ? URL.createObjectURL(item.image)
                              : "https://i.ibb.co/4g2RtSS/abstract-blue-geometric-shapes-background-1035-17545.webp"
                          }
                          alt="hotel"
                        />
                        <Form.Group className="my-3" controlId={`file_${i}`}>
                          <Form.Control
                            size="lg"
                            required
                            type="file"
                            disabled={user?.id === post?.created_by}
                            onChange={(e) =>
                              handleProofChange(i, "image", e.target.files[0])
                            }
                          />
                        </Form.Group>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
            {user ? (
              <>
                {user?.id !== post?.created_by && (
                  <div className="action-buttons d-flex justify-content-between align-items-center py-4">
                    <Button
                      variant="outline-secondary"
                      onClick={() => navigate(-1)}>
                      Go Back
                    </Button>
                    <Button
                      variant="success"
                      disabled={user?.id === post?.created_by}
                      onClick={handleProof}>
                      Submit Task
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                <Row>
                  <Col md={6} xs={12} className="mx-auto py-3">
                    <Alert variant="danger" className="text-center">
                      Please login to submit your proof
                    </Alert>
                  </Col>
                </Row>
              </>
            )}
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
