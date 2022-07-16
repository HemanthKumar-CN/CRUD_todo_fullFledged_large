import { HStack } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
// import Navbar from "../Components/Navbar";
import { ReqAuth } from "../Components/ReqAuth";
import Sidebar from "../Components/Sidebar";
import EditPage from "./EditPage";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

const MainRoutes = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={
            <ReqAuth>
              <HStack>
                <Sidebar />

                <Home />
              </HStack>
            </ReqAuth>
          }
        />
        <Route
          path="/task/:id"
          element={
            <ReqAuth>
              <HStack>
                <Sidebar />
                <EditPage />
              </HStack>
            </ReqAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
