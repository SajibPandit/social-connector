import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function ReferalDetails() {
  return (
    <div>
      <Container>
        <Row>
          <Col md={6} className="mx-auto">
            <h3 className="text-center py-3">Invite Instructions</h3>
            <p
              style={{
                textAlign: "justify",
              }}>
              After first three posts, you have to refere theree real Users
              within one month, who will actively use Our Website. If you give
              fake referral then youre posts will not be reach and youre id will
              shew inactive the more people you for the firest refennel, See
              will get a point bonus equal to 5$ dollars, Forthe seeound
              reeffers, a point bouns equal to idelleres, Fore the thired
              Referrer, you will get a point debones equal to 10 dollars, the
              more people you reetere, the morte paint income you get. Each of
              your referreals will be manually checked and then bonus points
              will be added
            </p>

            {/* Referal Link Input */}
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Invite Link</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                // value={data?.name}
                // isInvalid={!!errors.name}
                // onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </Form.Group>
            <Button variant="secondary" className="w-100" size="lg">
              Copy Invite Link
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ReferalDetails;
