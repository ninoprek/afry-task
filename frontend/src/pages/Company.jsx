import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import EmployeeForm from "../components/EmployeeForm";
import { getCompany, reset } from "../features/company/companySlice";

function Company() {
  const [showCreate, setShowCreate] = useState(false);
  const [employeeCreated, setEmployeeCreated] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { currentCompany , isLoading, isError, message } = useSelector((state) => state.company);
  const company = currentCompany.company;
  const employees = currentCompany.employees;

  const companyID = location.state.companyID;

  useEffect(() => {
    if(isError) console.log(message);

    dispatch(getCompany(companyID));

    return () => {
      dispatch(reset());
    }
  },[user, isError, dispatch, message, companyID]);

  useEffect(() => {
    if (employeeCreated) {
      dispatch(getCompany(companyID));
      setShowCreate(false);
      setEmployeeCreated(false);
    }
  }, [employeeCreated, companyID, dispatch, showCreate]);

  if (isLoading) return <Spinner />

  return (
    <>
      { company &&
      <>
        <section className="heading" >
          <h1>{company.name}</h1>
          <p>{`Created on: ${new Date(company.createdAt).toLocaleDateString("sv-SE")}`}</p>
        </section>
        <section>
          <h2>Employees</h2>
          {employees && employees.length > 0 ?
            (
              employees.map((employee) => <div key={employee._id}>{employee.name}</div> )
            ) :
            (
              <div>There are no employees in this company</div>
            )
          }
          {
            !showCreate ?
              (
                <button
                  className="btn btn-block"
                  onClick={() => setShowCreate(true)}
                >Hire someone</button>
              ) :
              (
                <>
                  <EmployeeForm
                    companyID={company._id}
                    employeeCreated={ (isCreated) => { setEmployeeCreated(isCreated)} }
                  />
                  <button
                    className="btn btn-block"
                    onClick={() => setShowCreate(false)}
                  >Cancel</button>
                </>
              )
          }
        </section>
      </>
      }
    </>
  )
}

export default Company