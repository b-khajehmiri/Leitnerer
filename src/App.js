import React from "react";
import SignUp from "./components/SignUp";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CardsTable from "./components/CardsTable";
import Training from "./components/Training";
import AddCards from "./components/AddCards";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <ToastContainer
          position="bottom-left"
          autoClose={1500}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AddCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cardsTable"
            element={
              <ProtectedRoute>
                <CardsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training"
            element={
              <ProtectedRoute>
                <Training />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addCards"
            element={
              <ProtectedRoute>
                <AddCards />
              </ProtectedRoute>
            }
          />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
