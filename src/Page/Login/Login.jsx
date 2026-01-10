import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { saveOrUpdateUser } from "../Utils";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const { login, googleWithSignin } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // ---------- Normal Login ----------
  const handleLogin = async (data) => {
    try {
      const result = await login(data.email, data.password);
      const user = result.user;

      await saveOrUpdateUser({
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });

      toast.success(`Login Successfully, ${user.displayName}`);
      navigate(location.state || "/");
    } catch (error) {
      setError(error.message);
    }
  };

  // ---------- Google Login ----------
  const handleWithGoogle = async () => {
    try {
      const result = await googleWithSignin();
      const user = result.user;

      await saveOrUpdateUser({
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });

      toast.success(`Login Successfully, ${user.displayName}`);
      navigate(location.state || "/");
    } catch (error) {
      setError(error.message);
    }
  };

  // ---------- Demo User Login ----------
  const handleDemoUserLogin = async () => {
    try {
      await login("demo@user.com", "User123");
      toast.success("Logged in as Demo User");
      navigate("/");
    } catch {
      toast.error("Demo User login failed");
    }
  };

  // ---------- Demo Admin Login ----------
  const handleDemoAdminLogin = async () => {
    try {
      await login("ad@min.com", "11223344Aa");
      toast.success("Logged in as Demo Admin");
      navigate("/dashboard");
    } catch {
      toast.error("Demo Admin login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 max-w-6xl mx-auto">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login your account
        </h2>

        {/* ---------- Login Form ---------- */}
        <form onSubmit={handleSubmit(handleLogin)} className="card-body p-0">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}

            <label className="label mt-2">Password</label>
            <div className="relative">
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                })}
                type={show ? "text" : "password"}
                className="input input-bordered w-full"
                placeholder="Password"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-4 top-3 cursor-pointer"
              >
                {show ? <FaEye /> : <IoEyeOffSharp />}
              </span>
            </div>

            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">
                Password must be 6+ characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-sm">
                Password must contain uppercase & lowercase
              </p>
            )}

            <div className="mt-2">
              <Link to="/forgot-password" className="link link-hover text-sm">
                Forgot password?
              </Link>
            </div>

            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

            <button type="submit" className="btn btn-outline w-full mt-4">
              Login
            </button>
          </fieldset>
        </form>

        {/* ---------- Google Login ---------- */}
        <div className="divider">or</div>

        <button
          onClick={handleWithGoogle}
          className="btn btn-outline w-full flex items-center gap-2"
        >
          <FcGoogle />
          Continue with Google
        </button>

        {/* ---------- Demo Login Buttons ---------- */}
        <div className="divider">Demo Access</div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleDemoUserLogin}
            className="btn btn-outline btn-primary w-full"
          >
            Demo User Login
          </button>

          <button
            onClick={handleDemoAdminLogin}
            className="btn btn-outline btn-secondary w-full"
          >
            Demo Admin Login
          </button>
        </div>

        {/* ---------- Register ---------- */}
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
