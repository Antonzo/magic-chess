import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "layouts/Layout"
import NoPage from "pages/NoPage"
import Room from "pages/Room"
import Home from "pages/Home"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="room" element={<Room />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
