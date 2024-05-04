import { useContext, useState } from "react";
import {
  Container,
  Form,
  Button,
  Image,
  Col,
  Row,
  Card,
  Alert,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

function Login() {
  // Defining initial state
  const initialState = {
    email: "",
    password: "",
  };
  // Form data state
  const [data, setData] = useState(initialState);

  // Errors and user feedback
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null);

  // Navigate instance
  const navigate = useNavigate();

  // Access the context to set user data
  const { setUserData } = useContext(UserContext);

  // Validation schema
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the data using the schema
      await validationSchema.validate(data, { abortEarly: false });

      // Make a POST request to the backend URL
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        data
      );

      // Set user data to the user context
      setUserData(response?.data?.user);

      // Reset errors and clear the login error
      setErrors({});
      setLoginError(null);

      // Reseting state
      setData(initialState);

      // Redirect the user to the home page
      navigate("/");
    } catch (error) {
      // Handle validation errors or other errors
      if (error instanceof yup.ValidationError) {
        // Convert yup errors to a format suitable for state
        const formattedErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
        setLoginError(null);
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      } else if (error.response && error.response.data) {
        // Handling Server Error
        setLoginError(error.response.data.message);
        setErrors({});
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Container className="mt-5 items-center my-auto">
        <Row>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <Image
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS1u05OPc7MSt9f5Dg2QMSbRPu_FHowIjog-jxeSwHIw&s"
              }
              className="img-fluid"
              rounded
            />
          </Col>

          <Col md={6} className="my-4">
            <Card className="p-5">
              <h2 className="mb-4 text-center">Login Here</h2>
              {loginError && (
                <Alert key="danger" variant="danger">
                  {loginError}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    size="lg"
                    type="email"
                    placeholder="Enter email"
                    value={data?.email}
                    isInvalid={!!errors.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    size="lg"
                    type="password"
                    placeholder="Password"
                    value={data?.password}
                    isInvalid={!!errors.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors?.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="w-100 mb-3"
                >
                  Submit
                </Button>
                <Container>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        flex: "1",
                        height: "1px",
                        backgroundColor: "black",
                      }}
                    ></div>
                    <span style={{ padding: "0 10px" }}>Or</span>
                    <div
                      style={{
                        flex: "1",
                        height: "1px",
                        backgroundColor: "black",
                      }}
                    ></div>
                  </div>
                </Container>

                <Button
                  size="lg"
                  variant="outline-primary"
                  className="d-flex align-items-center w-100 justify-content-center mb-3"
                >
                  <FaGoogle style={{ marginRight: "8px" }} />
                  Sign in with Google
                </Button>
                <Button
                  size="lg"
                  variant="outline-primary"
                  className="d-flex align-items-center w-100 justify-content-center mb-3"
                >
                  <FaFacebook style={{ marginRight: "8px" }} />
                  Sign in with Facebook
                </Button>

                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    marginLeft: "10px",
                  }}
                >
                  <p className="text-center">
                    Don&apos;t have an account? Create Here.
                  </p>
                </Link>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
}

export default Login;
