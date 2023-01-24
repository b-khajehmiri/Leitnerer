import React from "react";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CardsTable from "./components/CardsTable";
import Training from "./components/Training";
import AddCards from "./components/AddCards";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
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
