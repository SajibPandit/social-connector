import { useContext, useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import UserContext from "../../contexts/UserContext";
import toast from "react-hot-toast";

function Signup() {
  // Defining initial state
  const initialState = {
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    dob: "",
    gender: "",
  };

  // Form data state
  const [data, setData] = useState(initialState);

  // Errors and user feedback
  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState(null);
  const navigate = useNavigate();

  // Access the context to set user data
  const { setUserData } = useContext(UserContext);

  // Validation schema
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    password_confirmation: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Confirm password is required"),
    dob: yup.date().required("Date of birth is required"),
    gender: yup
      .string()
      .required("Gender is required")
      .oneOf(["male", "female", "other"], "Select a valid gender"),
  });

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    console.log(import.meta.env.VITE_BACKEND_URL);

    try {
      // Validate form data
      await validationSchema.validate(data, { abortEarly: false });

      // Make POST request to backend
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        data
      );

      // Set user data to ther local storage
      localStorage.setItem("zozoAuth", JSON.stringify(response?.data?.data));

      // // Set user data in context
      setUserData(response?.data?.data);

      // Clear errors
      setErrors({});
      setSignupError(null);

      // Reseting state
      setData(initialState);
      toast.success("User registered and logged in successfully");

      // Redirect to home page
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
        setSignupError(null);

        // Scroll to the top of the page
        window.scrollTo(0, 0);
      } else if (error.response && error.response.data) {
        // Handling Server Error
        setSignupError(error.response.data.message);
        console.log(error.response.data);
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
      style={{ minHeight: "50vh" }}>
      <Container className="mb-5 items-center">
        <Row>
          <Col md={6} className="mt-5 mx-auto">
            <Card className="p-5">
              <h2 className="mb-4 text-center">Signup Here</h2>

              {/* Display signup error if present */}
              {signupError && (
                <Alert key="danger" variant="danger">
                  {signupError}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {/* Name Input */}
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Enter name"
                    value={data?.name}
                    isInvalid={!!errors.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Username Input */}
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Enter username"
                    value={data?.username}
                    isInvalid={!!errors.username}
                    onChange={(e) =>
                      setData({ ...data, username: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email Input */}
                <Form.Group className="mb-3" controlId="formEmail">
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

                {/* Password Input */}
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    size="lg"
                    type="password"
                    placeholder="Enter password"
                    value={data?.password}
                    isInvalid={!!errors.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Confirm Password Input */}
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    size="lg"
                    type="password"
                    placeholder="Confirm password"
                    value={data?.password_confirmation}
                    isInvalid={!!errors.password_confirmation}
                    onChange={(e) =>
                      setData({
                        ...data,
                        password_confirmation: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password_confirmation}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Date of Birth Input */}
                <Form.Group controlId="formDob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    size="lg"
                    type="date"
                    name="dob"
                    value={data?.dob}
                    isInvalid={!!errors.dob}
                    onChange={(e) => setData({ ...data, dob: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dob}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Gender Selection */}
                <Form.Group controlId="formGender" className="mt-2 mb-2">
                  <Form.Label>Select Gender</Form.Label>
                  <Form.Select
                    size="lg"
                    aria-label="Select gender"
                    value={data?.gender}
                    isInvalid={!!errors.gender}
                    onChange={(e) =>
                      setData({ ...data, gender: e.target.value })
                    }>
                    <option>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.gender}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Submit Button */}
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="w-100 mt-5">
                  Submit
                </Button>

                {/* Link to Login */}
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    marginLeft: "10px",
                  }}>
                  <p className="text-center">
                    Already have an account? Login Here.
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

export default Signup;
