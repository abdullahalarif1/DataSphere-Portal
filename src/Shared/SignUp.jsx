import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import animation from "../assets/animation_llronacy.json";

import { LuLogIn } from "react-icons/lu";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        reset();
        Swal.fire({
          title: "Successfully Registered",
          icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        //update profile
        updateUserProfile(data.name).then(() => {
          // users post to mondo db
          axios
            .post("http://localhost:5000/users", {
              name: data.name,
              email: data.email,
            })
            .then((data) => {
              console.log(data);
              if (data.insertedId) {
              }
            });
        });

        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error.message));
  };

  const passwordMatch = (value) => {
    const { password, confirmPassword } = getValues();
    return password === confirmPassword || "Passwords do not match";
  };
  return (
    <div className="hero min-h-screen text-white md:p-12 px-3 py-20 border-2 border-warning bg">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <Lottie animationData={animation}></Lottie>
        </div>
        <div className="card  flex-shrink-0 w-full md:max-w-sm border border-warning   bg">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                {...register("name", { required: true })}
                className="input input-bordered border-1 border-warning bg"
              />
              {errors.name && (
                <small className="text-error">Name field is required</small>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="input input-bordered border-1 border-warning bg"
              />
              {errors.email && (
                <small className="text-error">Email field is required</small>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).*$/,
                })}
                name="password"
                placeholder="password"
                className="input input-bordered  border-1 border-warning bg"
              />
              {errors.password?.type === "required" && (
                <small className="text-error pt-1">
                  Password field is required
                </small>
              )}
              {errors.password?.type === "minLength" && (
                <small className="text-error pt-1">
                  Password must be 6 character
                </small>
              )}
              {errors.password?.type === "maxLength" && (
                <small className="text-error pt-1">
                  Password must be less than 20 characters
                </small>
              )}
              {errors.password?.type === "pattern" && (
                <small className="text-error pt-1">
                  password must have one uppercase, one lowercase, one number
                  and one special characters.
                </small>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Confirm Password</span>
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  validate: passwordMatch,
                })}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="input input-bordered border border-warning bg"
              />
              {errors.confirmPassword?.type === "required" && (
                <small className="text-error pt-1">
                  Confirm Password field is required
                </small>
              )}
              {errors.confirmPassword?.message && (
                <small className="text-error pt-1">
                  {errors.confirmPassword.message}
                </small>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-outline btn-warning border-2 text-white">
                register
                <LuLogIn className="text-lg" />
              </button>
            </div>
            <div className=" text-xs text-grey-600">
              Already have an account?{" "}
              <span>
                <Link className=" text-warning hover:underline" to="/login">
                  Please login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
