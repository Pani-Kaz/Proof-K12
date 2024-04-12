import { BrowserRouter, Route, Routes } from "react-router-dom";
import Posts from "./pages/posts.tsx";

function AppRoutes() {
    return (
        <main style={{
            paddingBottom: '10vh'
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Posts />}></Route>
                </Routes>
            </BrowserRouter>
        </main>
    )
}

export default AppRoutes;