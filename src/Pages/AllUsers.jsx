import React from "react";
import useUsers from "../components/useUsers";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";

const AllUsers = () => {
  const [users, refetch] = useUsers();

  const handleMakeAdmin = (user) => {
    axios.patch(`http://localhost:5000/users/admin/${user._id}`).then((res) => {
      console.log(res);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: `${user.name} is Admin Now`,
          icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        refetch();
      }
    });
  };

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
        axios.delete(`http://localhost:5000/users/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="py-14 px-5 ">
      <h1 className="text-3xl text-white text-center uppercase  py-10">
        <span className="text-warning">Manage All </span>Users
      </h1>
      <div className="overflow-x-auto ">
        <table className="table  text-white text-center">
          {/* head*/}
          <thead>
            <tr className="text-black uppercase bg-yellow-600 border">
              <th>#</th>
              <th> Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>

                <td>{user.name}</td>
                <td>{user.email}</td>
                <td onClick={() => handleMakeAdmin(user)}>
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <MdOutlineAdminPanelSettings className="text-4xl text-warning hover:text-slate-700" />
                  )}
                </td>

                <td onClick={() => handleDelete(user._id)} className="b ">
                  <RiDeleteBin5Line className="text-4xl text-error hover:text-slate-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
