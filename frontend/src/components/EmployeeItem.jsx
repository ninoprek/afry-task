import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCut, FaFileSignature } from "react-icons/fa";
import { removeEmployee, addEmployee, reset } from "../features/employee/employeeSlice";

function EmployeeItem({ employee, company, fetchData, owner }) {
  const dispatch = useDispatch();
  const { isSuccessAdd, isSuccessRemove } = useSelector((state) => state.employee);

  useEffect(() => {
    if (isSuccessAdd) fetchData();

    return() => {
      if (isSuccessAdd) dispatch(reset());
    }
  },[ isSuccessAdd, dispatch, fetchData ]);

  useEffect(() => {
    if (isSuccessRemove) fetchData();

    return() => {
      if (isSuccessRemove) dispatch(reset());
    }
  },[ isSuccessRemove, dispatch, fetchData ]);

  const handleRemoveEmployee = async () => {
    dispatch(removeEmployee(employee));
  };

  const handleAddEmployee = async () => {
    const employeeData = {
      employee: employee,
      company_id: company._id
    }

    dispatch(addEmployee(employeeData));
  };

  return (
    <div className="employeeContainer">
      <div
        className="employee"
      >{ `${employee.name} - ${employee.position}` }</div>
      { owner ? employee.company ?
      (
        <button
          className="employeeRemoveButton"
          onClick={handleRemoveEmployee}>
          <FaCut />
        </button>
      ) :
      (
        <button
          className="employeeAddButton"
          onClick={handleAddEmployee}>
          <FaFileSignature />
        </button>
      ) : ""}
    </div>
  )
}

export default EmployeeItem