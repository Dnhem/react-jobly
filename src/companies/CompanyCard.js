import "./CompanyCard.css";

const CompanyCard = ({ name, description, logoUrl }) => {
  return (
    <div className="CompanyCard-container">
      <div className="CompanyCard-card">
        <h4>{name}</h4>
        <small>{description}</small>
        <img src={logoUrl} alt={name} />
      </div>
    </div>
  );
};

export default CompanyCard;
