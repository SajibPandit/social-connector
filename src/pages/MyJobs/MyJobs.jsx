import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { motion } from "framer-motion";
import PendingTask from "../../components/MyJobs/PendingTask";
import RejectedTask from "../../components/MyJobs/RejectedTask";
import Jobs from "../../components/MyJobs/Jobs";
import FinishedJobs from "../../components/MyJobs/FinishedJobs";

function MyJobs() {
  return (
    <motion.div>
      <Container className="my-3">
        <Tabs
          defaultActiveKey="jobs"
          id="fill-tab-example"
          className="mb-3"
          variant="underline"
          justify>
          <Tab eventKey="jobs" title="My Jobs">
            <Jobs />
          </Tab>
          <Tab eventKey="pending" title="Pending Job">
            <PendingTask />
          </Tab>
          <Tab eventKey="finished" title="Finished Job">
            <FinishedJobs />
          </Tab>
          <Tab eventKey="rejected" title="Rejected">
            <RejectedTask />
          </Tab>
        </Tabs>
      </Container>
    </motion.div>
  );
}

export default MyJobs;
