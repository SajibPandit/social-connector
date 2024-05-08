import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1 className="text-center">404 - Page Not Found</h1>
            <p className="text-center">
              Sorry, the page you are looking for does not exist.
            </p>
            <div className="text-center">
              <Link to="/">
                <Button variant="primary">Go Home</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default NotFound;
