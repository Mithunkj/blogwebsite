import "./App.css";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post from "./Post";
import SingUp from "./SingUp";
import Login from "./Login";
import Welcom from "./compount/welcom";
import Header from "./compount/Header";
import SingleBlog from "./compount/SingleBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/welcom" element={<Welcom />}></Route>
          <Route path="/post" element={<Post />}></Route>
          <Route path="/signup" element={<SingUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/post/:postId" element={<SingleBlog />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
