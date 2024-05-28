import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button, Col, Row, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import * as yup from "yup";
import axios from "axios";
import { proofTypes, proofs } from "../../utils/data";
import UserContext from "../../contexts/UserContext";
import toast from "react-hot-toast";

function CreatePost() {
  const initialState = {
    title: "",
    description: "",
    category_id: "",
    task_type: "",
    quantity: "",
    amount: "",
    country_id: null,
    link: "",
    deadline: "",
    proof: [],
  };

  const [data, setData] = useState(initialState);
  const [allCategory, setAllCategory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [allCountry, setAllCountry] = useState([]);
  const [errors, setErrors] = useState({});
  const { user } = useContext(UserContext);

  // Fetching categories and sub categories
  useEffect(() => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/category`).then((res) => {
        setAllCategory(res?.data?.data);
      });
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/country`).then((res) => {
        setAllCountry(res?.data?.data);
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

  // Define yup validation schema
  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    category_id: yup.string().required("Category is required"),
    task_type: yup.string().when("category", {
      is: (val) => !!val,
      then: yup.string().required("Subcategory is required"),
    }),
    quantity: yup
      .number("Quantity must be number type")
      .positive("Quantity must be greater than zero")
      .required("Quantity is required"),
    amount: yup
      .number("Amount must be number type")
      .positive("Amount must be greater than zero")
      .required("Amount is required"),
    link: yup.string().url("Invalid URL format").required("Link is required"),
    deadline: yup
      .string()
      .required("Deadline is required")
      // .min(new Date(), "Deadline must be greater than now"),
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      // Validate form data using the schema
      await validationSchema.validate(data, { abortEarly: false });

      //persing data form local storage
      const storedUser = localStorage.getItem("zozoAuth");
      const parsedData = JSON.parse(storedUser);

      // Perform form submission logic here (sending data to server)
      const responsedata = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/task`,
        {
          ...data,
          user_id: parsedData.id,
        },
        {
          headers: {
            authorization: `Bearer ${parsedData.token}`,
          },
        }
      );
      toast.success(responsedata.data.message);
      // Reset errors state
      setErrors({});
      //Reset state data
      setData(initialState);
    } catch (error) {
      // Handle validation errors or other errors
      if (error instanceof yup.ValidationError) {
        // Convert yup errors to a format suitable for state
        const formattedErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        console.log(formattedErrors);
        setErrors(formattedErrors);
        // setLoginError(null);
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      } else if (error.response && error.response.data) {
        // Handling Server Error
        // setLoginError(error.response.data.message);
        setErrors({});
        // Scroll to the top of the page
        window.scrollTo(0, 0);
        console.log(error.response.data);
      }
    }
  };

  const handleProofChange = (e, index, fieldType) => {
    const { value } = e.target;

    // Make a copy of the current proof array
    const updatedProof = [...data.proof];

    // Update the corresponding field (question or type) in the proof item at the specified index
    updatedProof[index] = {
      ...updatedProof[index],
      [fieldType]: value,
    };

    // Update the state with the new proof array
    setData({
      ...data,
      proof: updatedProof,
    });
  };

  return (
    <motion.section
      style={{ minHeight: "50vh", paddingBottom: "20px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}>
      <Container className="items-center">
        <Row>
          <Col md={8} className="mt-5 mx-auto">
            <Card className="p-3 p-md-5">
              <h2 className="mb-4 text-center">Create a Post</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Enter title"
                    value={data?.title}
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                    isInvalid={!!errors.title}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    size="lg"
                    placeholder="Enter description"
                    as="textarea"
                    rows={3}
                    value={data?.description}
                    onChange={(e) =>
                      setData({ ...data, description: e.target.value })
                    }
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  md={12}
                  controlId="formGender"
                  className="mt-2 mb-2">
                  <Form.Label>Select Category</Form.Label>
                  <Form.Select
                    size="lg"
                    aria-label="Default select example"
                    value={data?.category_id}
                    onChange={(e) =>
                      setData({ ...data, category_id: e.target.value })
                    }
                    isInvalid={!!errors.category_id}>
                    <option value="">Select Category</option>
                    {allCategory?.map((category, i) => (
                      <option key={i} value={category.id}>
                        {category?.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  md={12}
                  controlId="formGender"
                  className="mt-2 mb-2">
                  <Form.Label>Select Sub Category</Form.Label>
                  <Form.Select
                    size="lg"
                    aria-label="Default select example"
                    value={data?.task_type}
                    disabled={!data.category_id}
                    onChange={(e) =>
                      setData({ ...data, task_type: e.target.value })
                    }
                    isInvalid={!!errors.task_type}>
                    <option value="">Select Sub Category</option>
                    {allSubCategory?.map((category, i) => (
                      <option key={i} value={category.id}>
                        {category?.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.subCategory}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Enter Link"
                    value={data?.link}
                    onChange={(e) => setData({ ...data, link: e.target.value })}
                    isInvalid={!!errors.link}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.link}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Task Quantity</Form.Label>
                  <Form.Control
                    size="lg"
                    type="number"
                    placeholder="Enter quantity"
                    value={data?.quantity}
                    onChange={(e) =>
                      setData({ ...data, quantity: e.target.value })
                    }
                    isInvalid={!!errors.quantity}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.quantity}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Per Task Amount</Form.Label>
                  <Form.Control
                    size="lg"
                    type="number"
                    placeholder="Enter amount"
                    value={data?.amount}
                    onChange={(e) =>
                      setData({ ...data, amount: e.target.value })
                    }
                    isInvalid={!!errors.amount}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.amount}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Date of Birth Input */}
                <Form.Group controlId="formDob">
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    size="lg"
                    type="date"
                    name="deadline"
                    value={data?.deadline}
                    isInvalid={!!errors.deadline}
                    onChange={(e) =>
                      setData({ ...data, deadline: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.deadline}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Prefered Country Input */}
                <Form.Group controlId="formGender" className="my-3">
                  <Form.Label>Prefered Country (If needed)</Form.Label>
                  <Form.Select
                    size="lg"
                    aria-label="Default select example"
                    value={data?.country_id}
                    onChange={(e) =>
                      setData({ ...data, country_id: e.target.value })
                    }>
                    <option>Select Location</option>
                    {allCountry.map((option, i) => (
                      <option key={i} value={option?.id}>
                        {option?.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Card
                  className="proff-top d-flex justify-content-between align-items-center flex-row p-3 my-3"
                  style={{ backgroundColor: "#eee" }}>
                  <h6>Required proof</h6>
                  <Button variant="outline-secondary">See how it works</Button>
                </Card>

                {/* {proofs.map((item, i) => (
                  <>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>
                        Title for {`${item.title}`}{" "}
                        {item.key === "proof1" ? "(Required)" : ""}
                      </Form.Label>
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder={`Type question for ${item.key}`}
                        value={data?.proof[item.key]?.question}
                        required={item.key === "proof1"}
                        onChange={(e) =>
                          setData({
                            ...data,
                            proof: {
                              ...data?.proof,
                              [item.key]: {
                                ...data?.proof[item.key],
                                question: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md={12}
                      controlId="formGender"
                      className="mt-2 mb-2">
                      <Form.Label>
                        Select Proof Type{" "}
                        {item.key === "proof1" ? "(Required)" : ""}
                      </Form.Label>
                      <Form.Select
                        size="lg"
                        aria-label="Default select example"
                        value={data?.proof[item.key]?.type}
                        required={item.key === "proof1"}
                        onChange={(e) =>
                          setData({
                            ...data,
                            proof: {
                              ...data?.proof,
                              [item.key]: {
                                ...data?.proof[item.key],
                                type: e.target.value,
                              },
                            },
                          })
                        }>
                        <option>Select</option>
                        {proofTypes?.map((cat, i) => (
                          <option key={i} value={cat.type}>
                            {cat?.title}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </>
                ))} */}

                {proofs.map((item, i) => (
                  <React.Fragment key={i}>
                    <Form.Group className="mb-3" controlId={`question_${i}`}>
                      <Form.Label>
                        Title for {`${item.title}`}{" "}
                        {item.key === "proof1" ? "(Required)" : ""}
                      </Form.Label>
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder={`Type question for ${item.key}`}
                        value={data?.proof[i]?.question}
                        required={item.key === "proof1"}
                        onChange={(e) => handleProofChange(e, i, "question")}
                      />
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md={12}
                      controlId={`type_${i}`}
                      className="mt-2 mb-2">
                      <Form.Label>
                        Select Proof Type{" "}
                        {item.key === "proof1" ? "(Required)" : ""}
                      </Form.Label>
                      <Form.Select
                        size="lg"
                        aria-label="Default select example"
                        value={data?.proof[i]?.type}
                        required={item.key === "proof1"}
                        onChange={(e) => handleProofChange(e, i, "type")}>
                        <option>Select</option>
                        {proofTypes?.map((cat, j) => (
                          <option key={j} value={cat.type}>
                            {cat?.title}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </React.Fragment>
                ))}

                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="w-100 mt-5">
                  Create Task
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
}

export default CreatePost;
