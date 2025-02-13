import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import WorkspaceLanding from './pages/WorkspaceLanding';
import About from './pages/about';  // Make sure to import the About component

const App = () => {
  return (
<BrowserRouter>
  <div className="bg-white dark:bg-[#212121]  text-black dark:text-white min-h-screen">
    <Header />
    <Routes>
      <Route path="/" element={<WorkspaceLanding />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </div>
</BrowserRouter>

  );
}

export default App;
