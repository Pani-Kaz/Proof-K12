import { BrowserRouter, Route, Routes } from "react-router-dom";
import Posts from "./pages/posts.tsx";

function AppRoutes () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Posts/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;