import TablaUsuarios from "./components/TablaUsuarios/TablaUsuarios";
import Navbar from "../src/components/Navbar/Navbar";

import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <TablaUsuarios />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}
