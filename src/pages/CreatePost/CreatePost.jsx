import { useState } from "react";
import { Container, Form, Button, Col, Row, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import * as yup from "yup";

function CreatePost() {
  const initialState = {
    title: "",
    description: "",
    category: "",
    subCategory: "",
    quantity: "",
    amount: "",
  };

  const [data, setData] = useState(initialState);

  const [errors, setErrors] = useState({});

  // Define yup validation schema
  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
    subCategory: yup.string().when("category", {
      is: (val) => !!val,
      then: yup.string().required("Subcategory is required"),
    }),
    quantity: yup.number().positive().required("Quantity is required"),
    amount: yup.number().positive().required("Amount is required"),
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form data using the schema
      await validationSchema.validate(data, { abortEarly: false });

      // Perform form submission logic here (e.g., sending data to server)
      console.log(data);

      // Reset errors state
      setErrors({});
    } catch (validationErrors) {
      // Convert yup errors into a format suitable for setting state
      const formattedErrors = validationErrors.inner.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
      setErrors(formattedErrors);
    }
  };

  return (
    <motion.section
      style={{ minHeight: "50vh", paddingBottom: "20px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Container className="items-center">
        <Row>
          <Col md={8} className="mt-5 mx-auto">
            <Card className="p-5">
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
                  className="mt-2 mb-2"
                >
                  <Form.Label>Select Category</Form.Label>
                  <Form.Select
                    size="lg"
                    aria-label="Default select example"
                    value={data?.category}
                    onChange={(e) =>
                      setData({ ...data, category: e.target.value })
                    }
                    isInvalid={!!errors.category}
                  >
                    <option>Select Category</option>
                    <option value="facebook">Facebook</option>
                    <option value="youtube">Youtube</option>
                    <option value="instagram">Instagram</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  md={12}
                  controlId="formGender"
                  className="mt-2 mb-2"
                >
                  <Form.Label>Select Sub Category</Form.Label>
                  <Form.Select
                    size="lg"
                    aria-label="Default select example"
                    value={data?.subCategory}
                    disabled={!data.category}
                    onChange={(e) =>
                      setData({ ...data, subCategory: e.target.value })
                    }
                    isInvalid={!!errors.subCategory}
                  >
                    <option>Select Sub Category</option>
                    <option value="facebook">Like</option>
                    <option value="youtube">Comments</option>
                    <option value="instagram">Subscribe</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.subCategory}
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

                <Form.Group controlId="formFileLg" className="mb-3">
                  <Form.Label>Select Image</Form.Label>
                  <Form.Control type="file" size="lg" />
                </Form.Group>

                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="w-100 mt-5"
                >
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
