import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import LoginSignup from './pages/LoginSignup'
import VotingComponent from './pages/VotingComponent'
import PasswordResetRequest from './pages/PasswordResetRequest'
import ResetPasswordForm from './pages/ResetPasswordForm'
import Payment from './pages/Payment'
import TermsAndConditions from './pages/TermsAndCondition'

const Main = () => {
  return (
    <div>
        <Routes>
          <Route path='/frontend' element={<Login/>}/>
          <Route path='/frontend/signup' element={<LoginSignup/>}/>
          <Route path='/frontend/pay-registration-fee' element={<Payment/>}/>
          <Route path='/frontend/reset' element={<PasswordResetRequest/>}/>
          <Route path='/frontend/password/:token' element={<ResetPasswordForm/>}/>        
          <Route path='/frontend/candidates' element={<VotingComponent/>}/> 
          <Route path='/frontend/Terms-and-conditions' element={<TermsAndConditions/>}/>
        </Routes>
    </div>
  )
}

export default Main