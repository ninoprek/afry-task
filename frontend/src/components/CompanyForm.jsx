import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCompany } from "../features/company/companySlice";

function CompanyForm() {
  const [name, setCompanyName] = useState("");

  const dispatch = useDispatch();

  const onSubmitHandler = e => {
    e.preventDefault();

    dispatch(createCompany({name}));
  }

  return (
    <section className="form">
      <form onSubmit={ onSubmitHandler }>
        <div className="form-group">
          <label htmlFor="text">Your new company</label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            placeholder="Add company name"
            value={ name }
            onChange={e => setCompanyName(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <button
            className="btn btn-block"
            type="submit"
          >Add new company</button>
        </div>
      </form>
    </section>
  )
}

export default CompanyForm;