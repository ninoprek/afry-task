import React from "react";
import { useNavigate } from "react-router-dom";

function EmployeeItem({ employee, company }) {
  const navigate = useNavigate();

  const goToCompany = () => {
    navigate('/company', {
      state: {
        companyID: company._id
      }
    })
  };

  return (
    <div className="employeeListContainer">
      <div className="employeeList" >
        <div className="employeeListName">
          { `${employee.name} - ${employee.position}` }
        </div>
      { company && employee.company ?
      (
        <div className="employeeCompany"> Employer:
          <button
            className="employeeCompanyButton"
            onClick={goToCompany}
          >
            <span className="employeeCompanyButtonTitle">{ company.name }</span>
          </button>
        </div>
      ) :
      (
        <div className="employeeCompany">
          Unemployed
        </div>

      ) }
      </div>
    </div>
  )
}

export default EmployeeItem