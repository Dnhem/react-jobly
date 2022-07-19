import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import JoblyApi from "../api";
import Loading from "../Loading";
import JobCard from "../jobs/JobCard";

const CompanyDetails = () => {
  const { handle } = useParams();
  const [ companyDetails, setCompanyDetails ] = useState(null);

  useEffect(
    function loadCompanyDetails() {
      async function getCompanyDetails() {
        let companyDetails = await JoblyApi.getCompany(handle);
        setCompanyDetails(companyDetails);
      }
      getCompanyDetails();
    },
    [ handle ]
  );

  if (!companyDetails) return <Loading />;

  return (
    <div>
      <h1>{companyDetails.name}</h1>
      <p>{companyDetails.description}</p>
      {companyDetails.jobs.map(j => (
        <JobCard title={j.title} salary={j.salary} equity={j.equity} />
      ))}
    </div>
  );
};

export default CompanyDetails;
