import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Homepage from "./pages/Homepage"
import { Footer } from "./components/Footer"
import Login from "./pages/Login"
import SignIn from "./pages/SignIn"
import Popular from "./components/Popular"
import Romance from "./components/Romance"
import Manga from "./pages/Manga"
import Profile from "./pages/Profile"
import ProtectedRoute from "./routes/ProtectedRoute"
import { useState } from "react"

function App() {
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <div className="relative min-h-screen bg-[#1c1c1c] flex-1 flex flex-col">
        <Header />
        <Routes>
          <Route path="/" Component={Homepage} />
          <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/login" Component={Login} />
          <Route path="/signin" Component={SignIn} />
          <Route path="/manga/:id" Component={Manga} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default App
