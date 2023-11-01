import React from "react";

import { RouterProvider } from "react-router-dom";

import "./App.css";
import Router from "./Router";

function App() {
  return (
    <div className="App">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
