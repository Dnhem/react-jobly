import "./JobCard.css";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useContext } from "react";
import UserContext from "../auth/UserContext";
const JobCard = ({ id, title, salary, equity }) => {
  const [ applied, setApplied ] = useState();
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);

  useEffect(
    function updateAppliedStatus() {
      setApplied(hasAppliedToJob(id));
    },
    [ id, hasAppliedToJob ]
  );

  async function handleApply() {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <div className="JobCard-container">
      <div className="JobCard-card">
        <h6>{title}</h6>
        {salary && <p>Salary: {salary}</p>}
        <p>Equity: {equity}</p>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
