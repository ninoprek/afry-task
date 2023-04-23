import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CompanyForm from "../components/CompanyForm";
import CompanyItem from "../components/CompanyItem";
import Spinner from "../components/Spinner";
import { getCompanies, reset } from "../features/company/companySlice";


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { companies, isLoading, isError, message } = useSelector((state) => state.company);

  useEffect(() => {
    if(isError) console.log(message);

    if(!user) {
      navigate("/login");
    }

    dispatch(getCompanies());
    return () => {
      dispatch(reset());
    }
  },[user, isError, dispatch, navigate, message])

  if (isLoading) return <Spinner />

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Companies Dashboard</p>
      </section>

      <CompanyForm />

      <section className="content">
        {companies.owned && companies.owned.length > 0 ?
        (
          <>
            <h2>Companies owned by you</h2>
            <div className="companies">
            {companies.owned.map(company => (
              <CompanyItem key={company._id} company={company} owned={true} />
            ))}
            </div>
          </>
        ) :
        (<h3>You haven't created any companies yet</h3>)}
      </section>

      <section className="content">
        {companies.other && companies.other.length > 0 ?
        (
          <>
          <h2>Other Companies</h2>
          <div className="companies">
            {companies.other.map(company => (
              <CompanyItem key={company._id} company={company} owned={false}/>
            ))}
          </div>
          </>
        ) :
        (
          <h3>There are no companies created yet</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard