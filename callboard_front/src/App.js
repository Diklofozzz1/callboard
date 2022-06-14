import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import 'rsuite/dist/rsuite.min.css';

import MainPage from "./pages/MainPage/MainPage";
import {AuthProvider} from "./useAuthHook/useAuth";
import SearchPage from "./pages/SearchPage/SearchPage";
import AnnouncementPage from "./pages/announcementPage/AnnouncementPage";

function App() {
    return(
      <BrowserRouter>
          <AuthProvider>
              <Routes>
                  <Route path='' element={<MainPage/>}/>
                  <Route path='/search' element={<SearchPage/>}/>
                  <Route path='/add/:id' element={<AnnouncementPage/>}/>
              </Routes>
          </AuthProvider>
      </BrowserRouter>
    )
}

export default App;
