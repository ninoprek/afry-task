import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeItem from "../components/EmployeeItem";
import { getCompany, reset } from "../features/company/companySlice";
import { getUnemployed } from "../features/employee/employeeSlice";

function Company() {
  const [showCreate, setShowCreate] = useState(false);
  const [employeeCreated, setEmployeeCreated] = useState(false);

  const owner = useRef(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const { currentCompany , isLoading, isSuccess, isError, message } = useSelector((state) => state.company);
  const { unemployed } = useSelector((state) => state.employee);
  const { user } = useSelector((state) => state.auth);
  const company = currentCompany?.company;
  const employees = currentCompany?.employees;

  const companyID = location.state.companyID;

  useEffect(() => {
    if(isError) console.log(message);

    if (!isLoading) fetchData();

    return () => {
      dispatch(reset());
    }
  },[isError, dispatch, message]);

  useEffect(() => {
    if (employeeCreated) {
      dispatch(getCompany(companyID));
      dispatch(getUnemployed());
      setShowCreate(false);
      setEmployeeCreated(false);
    }
  }, [employeeCreated, companyID, dispatch, showCreate]);

  useEffect(() => {
    if (user && company) owner.current = user._id === company.user;
  }, [user, company, isSuccess]);

  const fetchData = () => {
    dispatch(getCompany(companyID));
    dispatch(getUnemployed());
  };


  if (isLoading) return <Spinner />

  return (
    <>
      { company && employees &&
      <>
        <section className="heading" >
          <h1>{company.name}</h1>
          <p>{`Created on: ${new Date(company.createdAt).toLocaleDateString("sv-SE")}`}</p>
        </section>
        <section>
          <h2>Employees</h2>
          { employees.length > 0 ?
            (
              employees.map((employee) =>
                <EmployeeItem
                  key={ employee._id }
                  employee={ employee }
                  fetchData={ fetchData }
                  owner={owner.current}
                /> )
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
                    employeeCreated={ isCreated => setEmployeeCreated(isCreated) }
                  />
                  <button
                    className="btn btn-block"
                    onClick={() => setShowCreate(false)}
                  >Cancel</button>
                </>
              )
          }
        </section>
        {
          unemployed && unemployed.length > 0 &&
          <section>
            <h2>Unemployed</h2>
            { unemployed.map((employee) =>
              <EmployeeItem
                key={ employee._id }
                employee={ employee }
                company={ company }
                fetchData={ fetchData }
                owner={owner.current}
              /> )}
          </section>
        }
      </>
      }
    </>
  )
}

export default Company