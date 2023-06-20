import React, {  useState } from "react";

import {  useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";
import './style.css'
const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const logout = () => {
    localStorage.clear();
    setIsLoading(true);
    // Simulating a logout process with a timeout
    setTimeout(() => {
      // Perform any necessary logout logic
      setIsLoading(false);
      navigate("/login");
    }, 1000);
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="dashboard-container">
        <h2 className="dashboard-heading">Welcome to Dashboard</h2>
        <div className="dashboard-actions">
          <button onClick={() => navigate("/notes")} type="btn">
            Notes
          </button>
          <button onClick={() => logout()} type="btn">
            Logout
          </button>
        </div>
        {/* <Link>Notes</Link> */}
      </div>
    </>
  );
};

export default Dashboard;
