import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, reset } from "../features/employee/employeeSlice";
import { toast } from "react-toastify";

function EmployeeForm({ companyID, employeeCreated }) {
  const [name, setEmployeeName] = useState("");
  const [email, setEmployeeEmail] = useState("");

  const dispatch = useDispatch();

  const { isSuccess, isError, message } = useSelector((state) => state.employee);

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess) employeeCreated(true);

    return () => {
      dispatch(reset());
    }
  },[isError, message, isSuccess, employeeCreated, dispatch]);

  const onSubmitHandler = e => {
    e.preventDefault();

    if (name === "" || email === "") {
      toast.error("Please add name and email");
    } else {
      const employeeData = {
        company: companyID,
        name: name,
        email: email
      }

      dispatch(createEmployee(employeeData));
    }
  }

  return (
    <section className="form">
      <form onSubmit={ onSubmitHandler }>
        <div className="form-group">
          <label htmlFor="text">Employee name</label>
          <input
            type="text"
            name="employeeName"
            id="employeeName"
            value={ name }
            onChange={e => setEmployeeName(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="text">Employee Email</label>
          <input
            type="email"
            name="employeeName"
            id="employeeName"
            value={ email }
            onChange={e => setEmployeeEmail(e.target.value)}
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