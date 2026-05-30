import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import './App.css';
import News from './Components/News';
import Bookmarks from './Components/Bookmarks';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import useStore from './store/useStore';

function App() {
  const [progress, setProgress] = useState(0);
  const { theme } = useStore();

  useEffect(() => {
    document.body.className = `${theme}-mode`;
  }, [theme]);

  return (
    <>
      <Router>
        <Navbar />
        <LoadingBar
          color='var(--accent-color)'
          progress={progress}
          height={3}
        />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} key="general" pagesize={6} category="general"/>}></Route>
          <Route path="/business" element={<News setProgress={setProgress} key="business" pagesize={6} category="business"/>}></Route>
          <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pagesize={6} category="entertainment"/>}></Route>
          <Route path="/health" element={<News setProgress={setProgress} key="health" pagesize={6} category="health"/>}></Route>
          <Route path="/science" element={<News setProgress={setProgress} key="science" pagesize={6} category="science"/>}></Route>
          <Route path="/sports" element={<News setProgress={setProgress} key="sports" pagesize={6} category="sports"/>}></Route>
          <Route path="/technology" element={<News setProgress={setProgress} key="technology" pagesize={6} category="technology"/>}></Route>
          <Route path="/bookmarks" element={<Bookmarks setProgress={setProgress} />}></Route>
        </Routes>
      </Router>  
    </>
  );
}

export default App;
