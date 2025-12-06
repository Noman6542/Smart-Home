import { Link, useLocation, useNavigate } from "react-router";
import { use, useState } from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const Register = () => {
  const { createUser, setUser, googleWithSignin } = use(AuthContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!validatePassword.test(password)) {
      Swal.fire(
        "Error",
        "Password must have 1 uppercase, 1 lowercase & 6+ chars",
        "error"
      );
      return;
    }
    // console.log(name, email, photo, password);
    createUser(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("User created:", result.user);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Firebase Error:", error.message);
      });
  };
  const handleWithGoogle = () => {
    googleWithSignin()
      .then((result) => {
        const user = result.user;
        toast.success(`Login Successfully, ${user.displayName}`);
        // console.log(user);

        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="hero bg-base-200 min-h-screen my-10">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl text-center">
        <h2 className="font-semibold text-3xl p-4">Register your account</h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            {/* name  */}
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Enter your name"
              required
            />

            {/* email  */}

            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />

            {/* Photo  */}

            <label className="label">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input"
              placeholder="Photo URL"
              required
            />

            {/* password  */}

            <label className="label">Password</label>
            <div className=" relative">
              <input
                name="password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Password"
                required
              />
              <span
                onClick={() => setShow(!show)}
                className=" absolute right-5 top-1/3 cursor-pointer z-50"
              >
                {show ? <FaEye></FaEye> : <IoEyeOff></IoEyeOff>}
              </span>
            </div>

            <div className="p-5 ">
              <p>
                Already have an account?
                <Link
                  to="/login"
                  className=" font-semibold hover:underline hover:text-[#4338ca] ml-2"
                >
                  Login
                </Link>
              </p>
            </div>
            {error && <p className="text-red-400">{error}</p>}
            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>
          </fieldset>
          <div className="flex justify-center items-center">
            <p className="font-bold text-2xl">or</p>
          </div>
        </form>
        <button
          onClick={handleWithGoogle}
          className="btn btn-soft btn-primary flex justify-center items-center mb-5 gap-2"
        >
          <FcGoogle></FcGoogle> Login with Google{" "}
        </button>
      </div>
    </div>
  );
};

export default Register;
