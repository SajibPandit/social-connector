import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaHandPointRight } from "react-icons/fa";
import { BsBoxArrowUpRight } from "react-icons/bs";
// import PostSeenModal from "../../components/Modal/PostSeenModal";
import TaskReportModal from "../../components/Modal/TaskReportModal";
import JobRulesModal from "../../components/Modal/JobRulesModal";
import HideJobModal from "../../components/Modal/HideJobModal";

function PostDetails() {
  const [data, setData] = useState({});
  const { id } = useParams();
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

    // let formData = new FormData();
    // setData({ ...data, user_id: parsedData.id, task_id: id });

    let formData = new FormData();
    formData.append("task_id", data.task_id);
    console.log("rthrthrth", data.proof);
    data.proof.forEach((item, index) => {
      formData.append(`proof[${index}][title]`, item.title);
      formData.append(`proof[${index}][image]`, item.image);
    });
    // formData.append("m", "er");
    // for (let key in data) {
    //   console.log(key);
    //   if (Array.isArray(data[key])) {
    //     data[key].forEach((item, index) => {
    //       for (let subKey in item) {
    //         formData.append(`${key}[${index}][${subKey}]`, item[subKey]);
    //       }
    //     });
    //   } else {
    //     formData.append(key, data[key]);
    //   }
    // }

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    //   for (let key in pair) {
    //     console.log(key + ": " + pair[key]);
    //   }
    // }

    // for (let key in data) {
    //   if (typeof data[key] === "object") {
    //     if (Array.isArray(data[key])) {
    //       data[key].forEach((item, index) => {
    //         for (let subKey in item) {
    //           formData.append(`${key}[${index}].${subKey}`, item[subKey]);
    //         }
    //       });
    //     } else {
    //       for (let subKey in data[key]) {
    //         formData.append(`${key}.${subKey}`, data[key][subKey]);
    //       }
    //     }
    //   } else {
    //     formData.append(key, data[key]);
    //   }
    // }

    // console.log(formData);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    // let objectFromFormData = {};

    // for (let pair of formData.entries()) {
    //   const key = pair[0];
    //   const value = pair[1];

    //   // Check if the key already exists in the object
    //   if (objectFromFormData.hasOwnProperty(key)) {
    //     // If the key already exists and its value is an array, push the new value
    //     if (Array.isArray(objectFromFormData[key])) {
    //       objectFromFormData[key].push(value);
    //     } else {
    //       // If the key already exists but its value is not an array, convert it to an array
    //       objectFromFormData[key] = [objectFromFormData[key], value];
    //     }
    //   } else {
    //     // If the key doesn't exist in the object, simply add the key-value pair
    //     objectFromFormData[key] = value;
    //   }
    // }

    // console.log("yyyyyyyyyyy", objectFromFormData);

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
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${parsedData.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
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
              <div>
                {/* Map through the proof array and render form fields for each proof item */}
                {data.proof.map((item, i) => (
                  <div key={i} className="my-3">
                    <h5 className="text-muted">{item.question}</h5>
                    {item.type === "text" ? (
                      <Form.Group className="my-3" controlId={`textarea_${i}`}>
                        <Form.Control
                          size="lg"
                          placeholder="Give answer"
                          as="textarea"
                          rows={3}
                          value={item.title || ""}
                          onChange={(e) =>
                            handleProofChange(i, "title", e.target.value)
                          } // Update title field
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
                            type="file"
                            onChange={(e) =>
                              handleProofChange(i, "image", e.target.files[0])
                            } // Update image field
                          />
                        </Form.Group>
                      </>
                    )}
                  </div>
                ))}
              </div>

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
