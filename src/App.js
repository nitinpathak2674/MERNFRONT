import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";

function App() {

  const [data, setData] = useState(false);
  const { setLoginData } = useContext(LoginContext);
  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("https://mernback-uw10.onrender.com/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const resData = await res.json();

    if (res.status === 401 || !resData) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(resData)
      history("/dash");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true)
    }, 2000)
  }, [])

  return (
    <>
      {
        data ? (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dash" element={<Dashboard />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
            Loading... &nbsp;
            <CircularProgress />
          </Box>
        )
      }
    </>
  );
}

export default App;
