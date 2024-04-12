import { BrowserRouter, Route, Routes } from "react-router-dom";
import Posts from "./pages/home.tsx";
import Post from "./pages/post.tsx";

function AppRoutes() {
    return (
        <main style={{
            paddingBottom: '10vh'
        }}>
            <BrowserRouter>
                <Routes>
                <Route path='/' element={<Posts />}></Route>
                <Route path='/post/:postId' element={<Post/>}></Route>
                </Routes>
            </BrowserRouter>
        </main>
    )
}

export default AppRoutes;