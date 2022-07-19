import "./JobCard.css";
import Button from "@mui/material/Button";

const JobCard = ({ title, salary, equity }) => {
  return (
    <div className="JobCard-container">
      <div className="JobCard-card">
        <h6>{title}</h6>
        {salary && <p>Salary: {salary}</p>}
        <p>Equity: {equity}</p>
        <Button variant="contained" color="secondary">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
