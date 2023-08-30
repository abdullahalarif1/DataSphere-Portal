import React from "react";
import jsPDF from "jspdf";
import { BiExport } from "react-icons/bi";
import { RiDeleteBack2Line } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import useVoters from "../components/useVoters";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [voters, setVoters] = useVoters();

  // export json data
  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("voters List", 10, 10);

    const jsonData = JSON.stringify(voters, null, 2);
    const lines = doc.splitTextToSize(
      jsonData,
      doc.internal.pageSize.width - 20
    );
    doc.text(10, 20, lines);

    doc.save("voters.pdf");
  };

  // handle delete
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your Contact has been deleted.", "success");
        axios.delete(`http://localhost:5000/voter-data/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            const remaining = voters.filter((t) => t._id !== _id);
            setVoters(remaining);
          }
        });
      }
    });
  };

  return (
    <div className="py-14 px-5 ">
      <div>
        <h1 className="text-3xl text-white text-center uppercase  pt-5">
          <span className="text-warning">Voters </span>List-({voters.length})
        </h1>
      </div>
      <div className=" flex justify-between items-center ">
        <Link to={"/addNew"}>
          <button className="text-white btn btn-warning mt-10 md:mt-0 btn-outline border-2 my-5">
            Add New <MdAdd className="text-lg" />
          </button>
        </Link>
        <button
          onClick={handleExportPDF}
          className="text-white btn btn-warning mt-10 md:mt-0 btn-outline border-2 my-5"
        >
          Export <BiExport className="text-lg" />
        </button>
      </div>
      <div className="overflow-x-auto ">
        <table className="table  text-white text-center">
          {/* head*/}
          <thead>
            <tr className="text-black uppercase bg-yellow-600 border">
              <th>Remove</th>
              <th>#</th>
              <th>Polling Booth Name</th>
              <th>Parent Constituency</th>
              <th>Winner</th>
              <th>Margin (%)</th>
              <th>Margin</th>
              <th>Total Voters</th>
              <th>BJP Votes</th>
              <th>BJP Votes (%)</th>
              <th>INC Votes</th>
              <th>INC Votes (%)</th>
            </tr>
          </thead>

          <tbody>
            {voters.map((voter, index) => (
              <tr key={voter._id}>
                <td
                  onClick={() => handleDelete(voter._id)}
                  className="border  border-error rounded "
                >
                  <RiDeleteBack2Line className="text-4xl text-error hover:text-slate-700" />
                </td>
                <th>{index + 1}</th>
                <td>{voter.pollingBoothName}</td>
                <td>
                  {voter.parentConstituency ? voter.parentConstituency : "N/a"}
                </td>

                <td>{voter.winner2014}</td>
                <td>{voter.marginPercentage}</td>
                <td>{voter.margin}</td>
                <td>{voter.totalVoters}</td>
                <td>{voter.BJPVotes}</td>
                <td>{voter.BJPPercentageVote}</td>
                <td>{voter.INCVotes}</td>
                <td>{voter.INCPercentageVotes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
