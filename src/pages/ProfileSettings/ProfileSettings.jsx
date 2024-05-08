import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import UserContext from "../../contexts/UserContext";
import axios from "axios";

function ProfileSettings() {
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

  // Access the context to set user data
  const { setUserData, user } = useContext(UserContext);

  const [allCountry, setAllCountry] = useState([]);

  // Fetching countries data
  useEffect(() => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/country`).then((res) => {
        setAllCountry(res?.data?.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setData(user);
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}>
      <Container>
        <Row>
          <Col md={6} className="my-3">
            <Card className="p-3">
              <Card.Body>
                <h4 className="text-center">
                  Update your profile information here
                </h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="Enter name"
                      value={data?.name}
                      isInvalid={!!errors.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
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

                  {/* Gender Selection */}
                  <Form.Group controlId="formGender" className="mt-2 mb-3">
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

                  {/* Location Input */}
                  <Form.Group controlId="formGender" className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Select
                      size="lg"
                      aria-label="Default select example"
                      value={data?.location}
                      onChange={(e) =>
                        setData({ ...data, location: e.target.value })
                      }>
                      <option>Select Location</option>
                      {allCountry.map((option, i) => (
                        <option key={i} value={option?.id}>
                          {option?.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {/* Submit Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="w-100 mt-5">
                    Update Profile
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="my-3">
            <Card className="p-3">
              <Card.Body>
                {/* Password Input */}
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Previous Password</Form.Label>
                  <Form.Control
                    size="lg"
                    type="password"
                    placeholder="Previous password"
                    // value={data?.password}
                    // isInvalid={!!errors.password}
                    // onChange={(e) =>
                    //   setData({ ...data, password: e.target.value })
                    // }
                  />
                </Form.Group>

                {/* Confirm Password Input */}
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    size="lg"
                    type="password"
                    placeholder="New password"
                    // value={data?.password_confirmation}
                    // isInvalid={!!errors.password_confirmation}
                    // onChange={(e) =>
                    //   setData({
                    //     ...data,
                    //     password_confirmation: e.target.value,
                    //   })
                    // }
                  />
                  {/* <Form.Control.Feedback type="invalid">
                    {errors.password_confirmation}
                  </Form.Control.Feedback> */}
                </Form.Group>

                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="w-100 mt-5">
                  Update Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default ProfileSettings;
