import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Navbar = lazy(() => import('navbar/navbar'));
const Characters = lazy(() => import('characters/characters'));

const App = () => (
    <Router>
        <Suspense fallback={<div>Loading Navbar...</div>}>
            <Navbar />
        </Suspense>

        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={<div className="p-6">Loading Characters...</div>}>
                        <Characters />
                    </Suspense>
                }
            />
        </Routes>
    </Router>
);

export default App;