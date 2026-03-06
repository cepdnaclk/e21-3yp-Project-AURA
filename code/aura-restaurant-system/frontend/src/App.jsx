import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import RobotUI from './pages/RobotUI/RobotUI';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import KitchenDisplay from './pages/KitchenDisplay/KitchenDisplay';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-dark-950 bg-grid">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<RobotUI />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/kitchen" element={<KitchenDisplay />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
