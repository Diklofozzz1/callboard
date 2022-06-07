import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import 'rsuite/dist/rsuite.min.css';

import MainPage from "./pages/MainPage/MainPage";

function App() {
    return(
      <BrowserRouter>
          <Routes>
              <Route path='' element={<MainPage/>}/>
          </Routes>
      </BrowserRouter>
    )
}

export default App;
