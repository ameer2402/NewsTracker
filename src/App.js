import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import './App.css';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <>
    <Router>
      <Navbar />
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Routes>
      <Route path="/" element={<News setProgress={setProgress} key="general" pagesize={6}  country="in" category="general"/>}></Route>
      <Route path="/business" element={<News setProgress={setProgress} key="business" pagesize={6}  country="in" category="business"/>}></Route>
      <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pagesize={6}  country="in" category="entertainment"/>}></Route>
      <Route path="/health" element={<News setProgress={setProgress} key="health" pagesize={6}  country="in" category="health"/>}></Route>
      <Route path="/science" element={<News setProgress={setProgress} key="science" pagesize={6}  country="in" category="science"/>}></Route>
      <Route path="/sports" element={<News setProgress={setProgress} key="sports" pagesize={6}  country="in" category="sports"/>}></Route>
      <Route path="/technology" element={<News setProgress={setProgress} key="technology" pagesize={6}  country="in" category="technology"/>}></Route>
      </Routes>
    </Router>  
    </>
  );
}

export default App;
