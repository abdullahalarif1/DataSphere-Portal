import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import Lottie from "lottie-react";
import animation from "../assets/animation_llronacy.json";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { signIn , user} = useContext(AuthContext);
  console.log(user);
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        Swal.fire({
          title: "Logged in successful",
          icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.log(error.message);
      });
  };
  return (
    <div className="hero min-h-screen text-white md:p-12 px-3 py-20 border-2 border-warning bg">
      <div className="hero-content flex-col lg:flex-row ">
        <div className="text-center lg:text-left">
          <Lottie animationData={animation}></Lottie>
        </div>
        <div className="card flex-shrink-0 w-full md:max-w-sm  border  border-warning bg ">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="text"
                {...register("email", { required: true })}
                placeholder="email"
                className="input  border border-warning input-bordered bg-black"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <div className="password-input  relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input w-full border border-warning  input-bordered bg-black"
                />
                <div
                  className="password-toggle-icon absolute right-5 top-4"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </div>
              </div>
            </div>
            {errorMessage && (
              <p className="text-red-500 ">
                {" "}
                <small>{errorMessage}</small>
              </p>
            )}
            <div className="form-control mt-6">
              <button className="btn btn-outline btn-warning border-2 text-white">
                Login <LuLogIn className="text-lg" />
              </button>
            </div>
            <div className=" text-xs text-grey-600">
              New to Contact Management?{" "}
              <span>
                <Link className=" text-warning hover:underline" to="/signUp">
                  Please Sign-up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
