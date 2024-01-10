import React from "react"
import "./App.css"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RequestWeb from "./pages/RequestWeb"
import IndexRequest from "./pages/IndexRequest"
import IndexGoods from "./pages/IndexGoods"
import IndexEmployee from "./pages/IndexEmployee"

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/request" element={<IndexRequest />} />
          <Route path="/goods" element={<IndexGoods />} />
          <Route path="/employee" element={<IndexEmployee />} />
        </Routes>
    </div>
  )
}

export default App
