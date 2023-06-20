import React, { useEffect, useState } from "react";
import "../authPages/style.css"; // Import the CSS file
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { endpoints } from "../../services/constants";
import Spinner from "../../components/spinner";

const ProfilePage = () => {
    const navigate=useNavigate()
  const userData = JSON.parse(localStorage.getItem("userData"));
 const TOKEN = localStorage.getItem("loginToken");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setFirstName(userData?.firstName);
      setLastName(userData?.lastName);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      let data = {
        firstName: firstName,
        lastName: lastName,
      };

     let res=  await axios.put(endpoints.UPDATE_PROFILE, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
  
      localStorage.setItem("userData", JSON.stringify(res?.data?.data?.user));
      setError("");
      setIsLoading(false);
      alert("Profile update successfully");
      navigate("/")
    } catch (error) {
      setIsLoading(false);
      const errMsg = error?.response?.data
        ? error?.response?.data?.message
        : error;
      setError(errMsg);
      console.log("error", error);
    }
  };
  if(isLoading){
    return  <Spinner loading={isLoading} />
  }
  return (
    <div className="centered-form profile-container">
    
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        {Error && <p style={{ color: "red" }}>{Error}</p>}

        <Link to="/">
          <p>back to dashboard</p>
        </Link>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfilePage;
