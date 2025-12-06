import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";

const Login = () => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const { login, googleWithSignin } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then((result) => {
        const user = result.user;
        toast.success(`Login Successfully, ${user.displayName}`);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => setError(error.message));
  };

  const handleWithGoogle = () => {
    googleWithSignin()
      .then((result) => {
        const user = result.user;
        toast.success(`Login Successfully, ${user.displayName}`);

        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => setError(error.message));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 max-w-6xl mx-auto rounded-4xl">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login your account
        </h2>

        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={show ? "text" : "password"}
                className="input"
                placeholder="Password"
              />
              <span
                onClick={() => setShow(!show)}
                className=" absolute right-5 top-1/3 cursor-pointer z-50"
              >
                {show ? <FaEye></FaEye> : <IoEyeOffSharp />}
              </span>
            </div>
            <div>
              <Link to="/forgot-password" className="link link-hover">
                Forgot password?
              </Link>
            </div>
            {error && <p className="text-red-400">{error}</p>}
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
          </fieldset>
        </form>

        <div className="divider">or</div>

        <button
          onClick={handleWithGoogle}
          className="btn btn-outline w-full flex items-center gap-2"
        >
          <FcGoogle></FcGoogle>
          Continue with Google
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
