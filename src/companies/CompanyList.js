import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";
import Loading from "../Loading";
import { v4 as uuidv4 } from "uuid";
import "./CompanyCard.css";

const CompanyList = () => {
  const [ companies, setCompanies ] = useState(null);

  useEffect(function loadCompanies() {
    getCompanies();
  }, []);

  async function getCompanies() {
    let { companies } = await JoblyApi.getCompanies();
    setCompanies(companies);
  }

  if (!companies) return <Loading />;

  return (
    <div>
      <h1>Companies</h1>
      {companies.map(company => (
        <Link
          key={uuidv4()}
          to={`/companies/${company.handle}`}
          className="CompanyCard-link"
        >
          <CompanyCard
            name={company.name}
            description={company.description}
            logoUrl={company.logoUrl}
          />
        </Link>
      ))}
    </div>
  );
};

export default CompanyList;
