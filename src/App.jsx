import AuthPage from "./pages/AuthPage"
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom"
import { useState } from "react"
import ProtectedRoute from "./components/ProtectedRoute"
import PreferencesPage from "./pages/PreferencesPage"
import SwipesPage from "./pages/SwipesPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/auth'
            element={<AuthPage />} />

          <Route path='/preferences' element={
            <ProtectedRoute>
              <PreferencesPage />
            </ProtectedRoute>
          } />

          <Route path='/swipes' element={
            <ProtectedRoute requirePreferences>
              <SwipesPage />
            </ProtectedRoute>
          } />

          <Route path='/' element={<Navigate to='/swipes' />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
