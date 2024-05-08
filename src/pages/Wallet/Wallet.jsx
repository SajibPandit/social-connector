import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
import UserContext from "../../contexts/UserContext";

function Wallet() {
  const [data, setData] = useState({});
  // Access the context to get user data
  const { user } = useContext(UserContext);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}>
      <Container>
        <Table className="justify-content-end">
          <thead>
            <tr>
              <th>My Earning Point</th>
              {/* <th></th>
              <th></th> */}
              <th className="d-flex align-items-center justify-content-end">
                My Balance
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Total Point : {user?.point !== undefined ? user?.point : "--"} P
                <br />
                Pending Point : 0.00 P
              </td>
              {/* <td>Mark</td>
              <td>Otto</td> */}
              <td className="d-flex align-items-center justify-content-end">
                Balance
                <br />$ 0.00 USD
              </td>
            </tr>
          </tbody>
        </Table>

        <Tabs
          defaultActiveKey="exchange"
          id="fill-tab-example"
          className="mb-3"
          variant="underline"
          justify>
          <Tab eventKey="deposit" title="Deposit">
            Will launch very soon
          </Tab>
          <Tab eventKey="withdraw" title="Withdraw">
            Will launch very soon
          </Tab>
          <Tab eventKey="transter" title="Transfer">
            Will launch very soon
          </Tab>
          <Tab eventKey="exchange" title="Exchange">
            <Card className="p-3">
              <Row>
                <Col md={6}>
                  <Form.Group
                    as={Col}
                    md={12}
                    controlId="formGender"
                    className="mt-2 mb-2">
                    <Form.Label>From</Form.Label>
                    <Form.Select
                      size="lg"
                      aria-label="Default select example"
                      value={data?.from}
                      onChange={(e) =>
                        setData({ ...data, from: e.target.value })
                      }>
                      <option>Select From Method</option>
                      <option value="pointWallet">Point Wallet</option>
                      <option value="dollarWallet">Dollar Wallet</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    as={Col}
                    md={12}
                    controlId="formGender"
                    className="mt-2 mb-2">
                    <Form.Label>To</Form.Label>
                    <Form.Select
                      size="lg"
                      aria-label="Default select example"
                      value={data?.to}
                      onChange={(e) =>
                        setData({ ...data, to: e.target.value })
                      }>
                      <option>Select To Method</option>
                      <option value="pointWallet">Point Wallet</option>
                      <option value="dollarWallet">Dollar Wallet</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Form.Group
                  as={Col}
                  md={6}
                  className="mb-3"
                  controlId="formBasicEmail">
                  <Form.Label>Ammout</Form.Label>
                  <Form.Control
                    size="lg"
                    type="number"
                    placeholder="Enter Ammount"
                    value={data?.ammount}
                    onChange={(e) =>
                      setData({ ...data, ammount: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  md={6}
                  className="mb-3"
                  controlId="formBasicEmail">
                  <Form.Label>Converted Ammount</Form.Label>
                  <Form.Control
                    disabled
                    size="lg"
                    type="number"
                    placeholder="0.00"
                    value={data?.convertedAmmount}
                    onChange={(e) =>
                      setData({ ...data, convertedAmmount: e.target.value })
                    }
                  />
                </Form.Group>

                <Col
                  md={12}
                  className="d-flex justify-content-center align-items-center p-2">
                  <Button className="btn-outline p-2 m-3">
                    Confirm Transfer
                  </Button>
                </Col>
              </Row>
            </Card>
            {/* <Row>
              <Col md={6}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3">
                  <Form.Control type="number" placeholder="name@example.com" />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control type="number" placeholder="Password" />
                </FloatingLabel>
              </Col>
            </Row> */}
          </Tab>
        </Tabs>
      </Container>
    </motion.div>
  );
}

export default Wallet;
