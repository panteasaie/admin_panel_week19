import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login/Login";
import RegistrationForm from "./pages/auth/Register/RegistrationForm";
import Products from "./pages/Dashboard/Products";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
      
        <Route
          path="/"
          element={
            token
              ? <Navigate to="/login" replace />  
              : <Navigate to="/register" replace />  
          }
        />

      
        <Route path="/register" element={<RegistrationForm />} />

        
        <Route path="/login" element={<Login />} />

        
        <Route path="/products" element={<Products />} />

        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;