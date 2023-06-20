import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { AllRoutes } from "./routes";
import PrivateRoute from "./routes/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        {AllRoutes?.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            element={
              item.isPrivate ? (
                <PrivateRoute>{item?.page}</PrivateRoute>
              ) : (
                item.page
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
