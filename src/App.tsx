import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SurveyCreatorWidget from './components/SurveyCreator';
import SurveyComponent from './components/SurveyComponent';
function App() {
  return (
    <div className="App">
      <Routes>
        {/*Can send JSON data and ICreatorOptions to render another widget! */}
        <Route path="/" element={<SurveyCreatorWidget/>}></Route>
        <Route path="/survey" element={<SurveyComponent/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
