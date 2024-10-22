import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import LoginSignup from './pages/LoginSignup'
import VotingComponent from './pages/VotingComponent'
import PasswordResetRequest from './pages/PasswordResetRequest'
import ResetPasswordForm from './pages/ResetPasswordForm'
import Payment from './pages/Payment'
import TermsAndConditions from './pages/TermsAndCondition'
import PrivacyPolicy from './pages/Privacy'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Testimonials from './pages/Testimonials'

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
          <Route path='/terms-and-conditions' element={<TermsAndConditions/>}/>
          <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/services' element={<Services/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/testimonials' element={<Testimonials/>}/>
        </Routes>
    </div>
  )
}

export default Main