import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoadingAuth, isErrorAuth, isSuccessAuth, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isErrorAuth) toast.error(message);

    if (isSuccessAuth || user) navigate('/');

    dispatch(reset());
  },[ user, isErrorAuth, isSuccessAuth, message, navigate, dispatch ]);

  const onChangeHandler = (e) => {
    setFormData((prevState) =>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    }

    dispatch(login(userData));
  }

  if (isLoadingAuth) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={ email }
              placeholder="Enter your email"
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={ password }
              placeholder="Enter your password"
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block"
            >Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login