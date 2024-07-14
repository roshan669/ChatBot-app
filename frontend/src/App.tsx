import  Header from "./components/Header";
import {Routes,Route} from "react-router-dom"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
function App() {

  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </main>
  )
}

export default App
