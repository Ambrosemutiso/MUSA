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
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<LoginSignup/>}/>
          <Route path='/pay-registration-fee' element={<Payment/>}/>
          <Route path='/reset' element={<PasswordResetRequest/>}/>
          <Route path='/password/:token' element={<ResetPasswordForm/>}/>        
          <Route path='/candidates' element={<VotingComponent/>}/> 
          <Route path='/Terms-and-conditions' element={<TermsAndConditions/>}/>
        </Routes>
    </div>
  )
}

export default Main