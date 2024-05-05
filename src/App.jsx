import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import RootLayout from "./components/Layout/RootLayout";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CreatePost from "./pages/CreatePost/CreatePost";
import Posts from "./pages/Posts/Posts";
import Wallet from "./pages/Wallet/Wallet";
import Profile from "./pages/Profile/Profile";
import PostDetails from "./pages/PostDetails/PostDetails";
import Logout from "./pages/Logout/Logout";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="*" element={<NotFound />} />
          <Route index path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="logout" element={<Logout />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="posts" element={<Posts />}>
            <Route path=":id" element={<PostDetails />} />
          </Route>
          <Route path="wallet" element={<Wallet />} />
          <Route path="post/:id" element={<PostDetails />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
