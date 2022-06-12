import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import 'rsuite/dist/rsuite.min.css';

import MainPage from "./pages/MainPage/MainPage";
import {AuthProvider} from "./useAuthHook/useAuth";

function App() {
    return(
      <BrowserRouter>
          <AuthProvider>
              <Routes>
                  <Route path='' element={<MainPage/>}/>
              </Routes>
          </AuthProvider>
      </BrowserRouter>
    )
}

export default App;
