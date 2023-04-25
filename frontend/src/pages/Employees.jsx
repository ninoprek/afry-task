import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees, reset } from "../features/employee/employeeSlice";
import { getCompanies } from "../features/company/companySlice";
import Spinner from "../components/Spinner";
import EmployeeListItem from "../components/EmployeeListItem";
import EmployeeForm from "../components/EmployeeForm";
import { toast } from "react-toastify";

function Employees() {
  const [employeeCreated, setEmployeeCreated] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { unemployed, employees, isErrorGet, isLoadingGet, isSuccessGet, message } = useSelector((state) => state.employee);
  const { companies, isSuccess } = useSelector((state) => state.company);

  useEffect(() => {
    if(!user) navigate("/login");
    else {
      if(isErrorGet) toast.error(message);
      console.log("SUCCESS: ", isSuccessGet);
      if (!isSuccessGet) {
        console.log("GET EMPLOYEES");
        dispatch(getEmployees());
        dispatch(getCompanies());
      }
    }

  }, [user, isErrorGet, isSuccessGet, dispatch]);

  useEffect(() => {
    console.log("EMPLOYEE CREATED: ", employeeCreated);
    if (employeeCreated) {
      dispatch(getEmployees());
      setEmployeeCreated(false);
    }
  },[employeeCreated, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    }
  },[])

  const getCompany = id => {
    let company = companies.owned.find( company => company._id === id);
    if (!company) company = companies.other.find((company) => company._id === id);
    return company
  }

  if (isLoadingGet || !user) return <Spinner />

  return (
    <>
      <section className="heading" >
        <h1>Employees</h1>
      </section>
      <section>
        <h2>Create new employee</h2>
        <EmployeeForm
          employeeCreated={ (created) => setEmployeeCreated(created) }
          companies={companies}
        />
      </section>
      { isSuccessGet && isSuccess && employees && unemployed &&
        <>
          <section className="content">
            <h2>Employed</h2>
            {
              employees && employees.length > 0 ?
              ( employees.map((employee) =>
                  <EmployeeListItem
                    key={ employee._id }
                    employee={ employee }
                    company={ getCompany(employee.company) }
                  />)
              ) :
              (
                <h3>No one is employed yet</h3>
              )
            }
          </section>

          <section className="content">
            <h2>Unemployed</h2>
            {
              unemployed && unemployed.length > 0 ?
              (
                unemployed.map((employee) =>
                  <EmployeeListItem
                    key={ employee._id }
                    employee={ employee }
                  />)
              ) :
              (
                <h3>No one is unemployed</h3>
              )
            }
          </section>
        </>
      }
    </>
  )
}

export default Employees