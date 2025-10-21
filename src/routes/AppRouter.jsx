import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../pages/Home/Home"

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* 추가 라우트는 여기에 추가하세요 */}
                {/* <Route path="/explore" element={<Explore />} /> */}
                {/* <Route path="/post/:id" element={<PostDetail />} /> */}
            </Routes>
        </Router>
    )
}
