
import "./sass/style.css";
import Dashboard from "./Dashboard";
import { HashRouter, Route, Routes } from 'react-router-dom'
import Login from "./Login";
import Patient from "./Patient";
import PaymentSucess from "./PaymentSucess";


export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Patient" element={<Patient />}></Route>
        <Route path="/payment-success" element={<PaymentSucess />}></Route>
      </Routes>
    </HashRouter>

  );
}
