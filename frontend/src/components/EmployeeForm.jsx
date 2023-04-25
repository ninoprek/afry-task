import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, reset } from "../features/employee/employeeSlice";
import { toast } from "react-toastify";

function EmployeeForm({ companyID, employeeCreated, companies }) {
  const [name, setEmployeeName] = useState("");
  const [email, setEmployeeEmail] = useState("");
  const [position, setEmployeePosition] = useState("");
  const [company, setEmployeeCompany] = useState(null);

  const dispatch = useDispatch();

  const { isSuccessCreate, isErrorCreate, isLoadingCreate, message } = useSelector((state) => state.employee);

  useEffect(() => {
    if (isErrorCreate && !isLoadingCreate) toast.error(message);

    if (isSuccessCreate) {
      toast.success(message);
      employeeCreated(true);

    }

    return () => {
      if(isSuccessCreate || isErrorCreate) dispatch(reset());
    }
  },[isErrorCreate, message, isSuccessCreate, dispatch]);

  const onSubmitHandler = e => {
    e.preventDefault();

    if (name === "" || email === "" || position === "") {
      toast.error("Please add all employee information");
    } else {
      const employeeData = {
        company: companyID || company === "None" ? null : company,
        name: name,
        email: email,
        position: position
      }
      dispatch(createEmployee(employeeData));
    }
  }

  return (
    <section className="form">
      <form onSubmit={ onSubmitHandler }>
        <div className="form-group">
          <label htmlFor="employeeName">Name</label>
          <input
            type="text"
            name="employeeName"
            id="employeeName"
            placeholder="Enter name"
            value={ name }
            onChange={e => setEmployeeName(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="employeeName">Email</label>
          <input
            type="email"
            name="employeeName"
            id="employeeName"
            placeholder="Enter Email"
            value={ email }
            onChange={e => setEmployeeEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="employeePosition">Position</label>
          <input
            type="text"
            name="employeePosition"
            id="employeePosition"
            placeholder="Enter position"
            value={ position }
            onChange={e => setEmployeePosition(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="employeeCompany">My companies</label>
          <select
            name="employeeCompany"
            id="employeeCompany"
            placeholder="Select Company"
            onChange={e => setEmployeeCompany(e.target.value)}
          >
            <option value={ null }>None</option>
            { companies && companies.owned && (
              companies.owned.map(comp =>
                <option key={comp._id} value={ comp._id }>{ comp.name }</option>
              )
            )}
          </select>
        </div>
        <div className="form-group">
          <button
            className="btn btn-block"
            type="submit"
          >Add new employee</button>
        </div>
      </form>
    </section>
  )
}

export default EmployeeForm