import { Link, useLocation, useNavigate } from "react-router";
import { use, useState } from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import { saveOrUpdateUser } from "../Utils";

const Register = () => {
  const { createUser, setUser, googleWithSignin, updateUserProfile } =
    use(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const location = useLocation();

  const handleRegister = (data) => {
    const profileImage = data.photo[0];

    createUser(data.email, data.password)
      .then((result) => {
        // store the image and get URL
        const fromData = new FormData();
        fromData.append("image", profileImage);
        const Image_Api_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_users_photo_secret_key
        }`;
        axios.post(Image_Api_URL, fromData).then((res) => {
          const imageURL = res.data.data.url;
          console.log("after image update", imageURL);

          // update profile

          const userProfile = {
            displayName: data.name,
            photoURL: imageURL,
          };
          saveOrUpdateUser({
            name: data.name,
            email: data.email,
            image: imageURL,
          });
          updateUserProfile(userProfile)
            .then(() => {
              navigate(location.state || "/");
            })
            .catch((error) => {
              toast.error(error.message);
            });
        });

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
        <form onSubmit={handleSubmit(handleRegister)} className="card-body">
          <fieldset className="fieldset space-y-3">
            {/* Name */}
            <label className="label font-medium">Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}

            {/* Email */}
            <label className="label font-medium">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}

            {/* Photo  */}
            <label className="label font-medium">Photo</label>
            <input
              {...register("photo", { required: true })}
              type="file"
              className="file-input input-bordered w-full"
              placeholder="Your Photo"
            />
            {errors.photoURL?.type === "required" && (
              <p className="text-red-500 text-sm">Photo is required</p>
            )}

            {/* Password */}
            <label className="label font-medium">Password</label>
            <div className="relative">
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                })}
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full pr-10"
                placeholder="Enter password"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 cursor-pointer text-gray-700"
              >
                {show ? <FaEye /> : <IoEyeOff />}
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
                Password must have 1 uppercase, 1 lowercase & 6+ chars
              </p>
            )}

            {/* Login Link */}
            <div className="pt-4">
              <p className="text-sm">
                Already have an account?
                <Link
                  to="/login"
                  className="font-semibold hover:underline hover:text-indigo-600 ml-1"
                >
                  Login
                </Link>
              </p>
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <button type="submit" className="btn btn-neutral w-full mt-3">
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
