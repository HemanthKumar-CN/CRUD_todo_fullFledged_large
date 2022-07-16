import logo from "./logo.svg";
import "./App.css";
import MainRoutes from "./Pages/MainRoutes";
import { Container } from "@chakra-ui/react";

function App() {
  return (
    <div style={{ paddingLeft: ".5rem" }}>
      <MainRoutes />
    </div>
  );
}

export default App;
