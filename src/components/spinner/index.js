import {ClipLoader} from "react-spinners";
import React from "react";
import "./style.css";

function Spinner({loading}) {
 return (
  <ClipLoader
   className='loader'
   size={30}
   color={"#123abc"}
   loading={loading}
  />
 );
}

export default Spinner;
