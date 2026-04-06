import AuthPage from "./pages/AuthPage"
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom"
import { useState } from "react"
import ProtectedRoute from "./components/ProtectedRoute"
import PreferencesPage from "./pages/PreferencesPage"
import SwipesPage from "./pages/SwipePage"
import SideMenu from "./components/Menu"
import ProfilePage from "./pages/ProfilePage"

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('access_token'))
  return (
    <>
      <BrowserRouter>
        <div className='flex'>
          {isAuth && <SideMenu/>}
          <div className="flex-1">
            <Routes>
              <Route path='/auth'
                element={<AuthPage onLogin={()=>setIsAuth(true)}/>} />

              <Route path='/preferences' element={
                <ProtectedRoute>
                  <PreferencesPage />
                </ProtectedRoute>
              } />

              <Route path='/profile' element={
                <ProtectedRoute>
                  <ProfilePage/>
                </ProtectedRoute>
              }/>

              <Route path='/swipes' element={
                <ProtectedRoute requirePreferences>
                  <SwipesPage />
                </ProtectedRoute>
              } />

              <Route path='/' element={isAuth?<Navigate to='/swipe' />:<Navigate to='/auth' />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
