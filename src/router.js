import { BrowserRouter, Route, Routes } from "react-router-dom";
import Posts from "./pages/home.tsx";
import Post from "./pages/post.tsx";
import NotFound from "./pages/404.tsx";
import Register from "./pages/register.tsx";
import Login from "./pages/login.tsx";

function AppRoutes() {
    return (
        <main style={{
            paddingBottom: '10vh'
        }}>
            <BrowserRouter>
                <Routes>
                <Route path='/' element={<Posts />}></Route>
                <Route path='/register' element={<Register/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/post/:postId' element={<Post/>}></Route>
                <Route path='*' element={<NotFound/>}></Route>
                </Routes>
            </BrowserRouter>
        </main>
    )
}

export default AppRoutes;