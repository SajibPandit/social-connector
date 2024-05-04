import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { motion } from "framer-motion";

function HeroAlter({ heading, text, refName }) {
  return (
    <motion.section
      className="home-section"
      ref={refName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Container>
        <Row>
          <Col md={6} className="text-center">
            <Image
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS1u05OPc7MSt9f5Dg2QMSbRPu_FHowIjog-jxeSwHIw&s"
              }
              className="img-fluid"
              rounded
            />
          </Col>
          <Col
            md={6}
            className="text-center d-flex justify-content-center align-items-center flex-column mt-3 mt-md-0 px-4 px-md-0"
          >
            <h1>{heading}</h1>
            <p>{text}</p>
            <div>
              <Button variant="secondary" className="m-2">
                Get Started
              </Button>
              <Button variant="outline-secondary">Learn More</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
}

export default HeroAlter;
