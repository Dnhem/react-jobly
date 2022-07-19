import JoblyApi from "../api";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import JobCard from "./JobCard";
import { v4 as uuidv4 } from "uuid";

const JobsList = () => {
  const [ jobs, setJobs ] = useState(null);

  useEffect(function getJobs() {
    listJobs();
  }, []);

  async function listJobs() {
    let jobResults = await JoblyApi.listAllJobs();
    setJobs(jobResults.jobs);
  }

  if (!jobs) return <Loading />;

  return (
    <div>
      <h1>Jobs</h1>
      {jobs.map(j => (
        <JobCard
          title={j.title}
          salary={j.salary}
          equity={j.equity}
          key={uuidv4()}
        />
      ))}
    </div>
  );
};

export default JobsList;
