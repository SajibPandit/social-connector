import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import PrivateRoute from "../../utils/PrivateRoute";

function Profile() {
  return (
    <PrivateRoute>
      <div>
        <Container>
          <Row className="mt-3">
            <Col md={4}>
              <Card className="p-3">
                <Row className="d-flex justify-content-center align-items-center">
                  <Col md={6}>
                    <Image
                      className="img-fluid my-3"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS1u05OPc7MSt9f5Dg2QMSbRPu_FHowIjog-jxeSwHIw&s"
                      rounded
                    />
                  </Col>
                </Row>

                <p className="text-center">Name</p>
                <p className="text-center">Bangladesh</p>

                <Row className="my-3">
                  <Col md={6}>
                    <p className="text-center text-muted">Member Since</p>
                    <p className="text-center ">April 2024</p>
                  </Col>
                  <Col md={6}>
                    <p className="text-center text-muted">Last Seen</p>
                    <p className="text-center">Online Now</p>
                  </Col>

                  <Col md={6}>
                    <p className="text-center text-muted">Followers</p>
                    <p className="text-center">45</p>
                  </Col>

                  <Col md={6}>
                    <p className="text-center text-muted">Following</p>
                    <p className="text-center">24</p>
                  </Col>
                </Row>

                <Button className="w-full m-3">Refer and Earn</Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </PrivateRoute>
  );
}

export default Profile;
