import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const AddNew = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Create a new class object with the form data
    const newVoter = {
      pollingBoothName: data.pollingBoothName,
      parentConstituency: data.parentConstituency,
      winner2014: data.winner2014,
      marginPercentage: data.marginPercentage,
      margin: data.margin,
      totalVoters: data.totalVoters,
      BJPVotes: data.BJPVotes,
      BJPPercentageVote: data.BJPPercentageVote,
      INCVotes: data.INCVotes,
      INCPercentageVotes: data.INCPercentageVotes,
    };
    console.log(newVoter);
    reset();

    // post mongo server
    axios
      .post("https://data-sphere-portal-server-site.vercel.app", newVoter)
      .then((res) => {
        console.log("successfully posted:", res);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Successfully added Voter",
            icon: "success",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
      })
      .catch((error) => {
        console.log("Error posting to the server:", error);
      });
  };

  const handleButton = () => {
    if (!user) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please log in First.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    }
  };

  return (
    <div className="  px-3 md:px-12 py-20">
      <h1 className="text-3xl text-white text-center uppercase  py-10 ">
        <span className="text-warning">Voter </span>Management
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card   mx-auto  shadow-2xl text-white border  border-warning">
          <div className="card-body grid md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">
                  Polling Booth Name*
                </span>
              </label>
              <input
                type="text"
                placeholder="Booth Name"
                // defaultValue={user?.displayName}
                className="input border bg-black border-warning input-bordered rounded-lg "
                name="name"
                required
                {...register("pollingBoothName")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">
                  Parent Constituency*
                </span>
              </label>
              <input
                type="text"
                // defaultValue={user?.email}
                placeholder="Parent Constituency"
                className="input border bg-black border-warning input-bordered rounded-lg "
                name="parent"
                required
                {...register("parentConstituency")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">Winner</span>
              </label>
              <input
                type="text"
                placeholder="winner"
                className="input border bg-black border-warning input-bordered rounded-lg "
                required
                {...register("winner2014")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">Margin (%)</span>
              </label>
              <input
                type="number"
                placeholder="margin percentage"
                className="input border bg-black border-warning input-bordered rounded-lg "
                required
                {...register("marginPercentage")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">Margin</span>
              </label>
              <input
                type="number"
                placeholder="margin"
                className="input border bg-black border-warning input-bordered rounded-lg "
                required
                {...register("margin")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">Total Voters</span>
              </label>
              <input
                type="number"
                placeholder="total voters"
                className="input border bg-black border-warning input-bordered rounded-lg "
                required
                {...register("totalVoters")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">BJP Votes</span>
              </label>
              <input
                type="number"
                placeholder="BJP votes"
                className="input border bg-black border-warning input-bordered rounded-lg "
                required
                {...register("BJPVotes")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">BJP Votes (%)</span>
              </label>
              <input
                placeholder="BJP percentage vote"
                className="input border bg-black border-warning input-bordered rounded-lg "
                required
                {...register("BJPPercentageVote")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">INC Votes</span>
              </label>
              <input
                type="number"
                placeholder="INC votes"
                className="input border bg-black border-warning input-bordered rounded-lg "
                required
                {...register("INCVotes")}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">INC Votes (%)</span>
              </label>
              <input
                placeholder="INC percentage votes"
                className="input border bg-black border-warning input-bordered rounded-lg "
                required
                {...register("INCPercentageVotes")}
              />
            </div>
          </div>

          <div className="mt-6 mx-8">
            <button
              onClick={handleButton}
              type="submit"
              className="btn btn-warning rounded-lg btn-outline border-2 w-full mb-10"
            >
              Add New Voter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNew;
