import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, reset } from "../features/employee/employeeSlice";
import { toast } from "react-toastify";

function EmployeeForm({ companyID, employeeCreated }) {
  const [name, setEmployeeName] = useState("");
  const [email, setEmployeeEmail] = useState("");
  const [position, setEmployeePosition] = useState("");

  const dispatch = useDispatch();

  const { isSuccessCreate, isError, message } = useSelector((state) => state.employee);

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccessCreate) {
      toast.success(message);
      employeeCreated(true);
    }

    return () => {
      if(isSuccessCreate) dispatch(reset());
    }
  },[isError, message, isSuccessCreate, employeeCreated, dispatch]);

  const onSubmitHandler = e => {
    e.preventDefault();

    if (name === "" || email === "" || position === "") {
      toast.error("Please add all employee information");
    } else {
      const employeeData = {
        company: companyID,
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
          <label htmlFor="text">Name</label>
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
          <label htmlFor="text">Email</label>
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
          <label htmlFor="text">Position</label>
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