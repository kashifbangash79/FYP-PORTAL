import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

function AdminDashboardStudent() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/students/${id}`);
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const filteredStudents = students.filter(student =>
    student.profile && student.profile.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Sidebar />

      <div className='container flex ml-72 mr-12 items-center justify-center w-auto h-16 bg-gray-100 mt-16 '>
        <span className='font-bold'>Department Name: </span>
        <span>Computer Science and IT</span>
      </div>

      <div className=" w-[950px] ml-[285px] h-96 mt-5  mb-10 rounded-lg bg-gray-100 ">
        <span className="font-semibold ml-5">Admin Portal</span>
        <div className="submenue rounded-full w-3/4 ml-6  mt-2 border-blue-300 border-2 h-12 ">
          <ul className="flex">
            <Link to='/AdminDashboardStudent' className="flex-1 ml-8 mt-2">Students</Link>
            <Link to='/AdminDashboardSupervisors' className="flex-1 mt-2 cursor-pointer">Supervisors</Link>
            <Link to="/AdminDashboardProject" className="flex-1 mt-2 cursor-pointer">
              Projects
            </Link>
          </ul>
        </div>

        <div className="search mx-1 my-1">
          <div className="relative flex w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 pl-10"
              type="text"
              id="search"
              placeholder="Search something.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <table className="table-auto w-full">
          <thead>
            <tr className="header bg-blue-200">
              <th>Batch No</th>
              <th>Reg No</th>
              <th>Name</th>
              <th>Section</th>
              <th>Email</th>
              <th>Program</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-purple-200 py-2" : ""}>
                <td>{student.profile?.batchNo || 'N/A'}</td>
                <td>{student.profile?.regNo || 'N/A'}</td>
                <td>{student.profile?.fullName || 'N/A'}</td>
                <td>{student.profile?.section || 'N/A'}</td>
                <td>{student.profile?.email || 'N/A'}</td>
                <td>{student.profile?.program || 'N/A'}</td>
                <td>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboardStudent;
