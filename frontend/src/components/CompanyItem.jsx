import React from "react";
import { useDispatch } from "react-redux";
import { deleteCompany } from "../features/company/companySlice";
import { useNavigate } from "react-router-dom";

function CompanyItem({ company, owned }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToCompany = () => {
    navigate('/company', {
      state: {
        companyID: company._id
      }
    })
  }

  return (
    <div className="company">
      <h2>{company.name}</h2>
      <button
        onClick={goToCompany}
        className="employeeCompanyButton employeeCompanyButtonTitle"
      >Go to company</button>
      {owned &&
        <button
          className="close"
          onClick={() => dispatch(deleteCompany(company._id))}
        >X</button>
      }
    </div>
  )
}

export default CompanyItem