
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/authPages/loginPage";
import RegisterPage from "./pages/authPages/signUp";
import ProfilePage from "./pages/profilePage";
import React,{ useState } from "react";
import Dashboard from "./pages/dashboard";


function App() {
   const [loginToken, setLoginToken] = useState("");
  

  const handlePage=()=>{
     // Check if a login token exists in local storage
      const storedToken = localStorage.getItem("loginToken");
     if (storedToken) {
       setLoginToken(storedToken);
     }
   }


if(loginToken === 'true'){
 return (
   <BrowserRouter>
     <Routes>
       <Route>
         <Route path="/" element={<Dashboard  onLogout={handlePage}/>}/>
         <Route path="/profile" element={<ProfilePage />} />
       </Route>
     </Routes>
   </BrowserRouter>
 );
}
else{
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<LoginPage  onLogin={handlePage}/>} />
          <Route path="/signup" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
}

export default App;
