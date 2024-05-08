import React from "react";
import { motion } from "framer-motion";
import { Container, Tab, Tabs } from "react-bootstrap";
import FinishedTask from "../../components/Performance/FinishedTask";
import PendingTask from "../../components/Performance/PendingTask";
import RejectedTask from "../../components/Performance/RejectedTask";

function Perfromance() {
  return (
    <motion.div>
      <Container className="my-3">
        <Tabs
          defaultActiveKey="finished"
          id="fill-tab-example"
          className="mb-3"
          variant="underline"
          justify>
          <Tab eventKey="finished" title="Finished Task">
            <FinishedTask />
          </Tab>
          <Tab eventKey="pending" title="Pending Review">
            <PendingTask />
          </Tab>
          <Tab eventKey="rejected" title="Rejected">
            <RejectedTask />
          </Tab>
        </Tabs>
      </Container>
    </motion.div>
  );
}

export default Perfromance;
