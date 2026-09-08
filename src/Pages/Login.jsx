import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleLogin = (e) => {
    e.preventDefault()
    try {
        const response = axios.post("http://127.0.0.1:8000/users/signin/", formData)

        if (response.status === 200) {
            console.log("Login successful", response.data)

        }
    } catch (error) {
        alert("Login failed. Please check your credentials and try again.")
    }
  }

  return (
    <div>
        <form>
            <div>
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required onChange={(e) => setFormData({...formData, email: e.target.value})} value={formData.email} />
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required onChange={(e) => setFormData({...formData, password: e.target.value})} value={formData.password} />
                </div>
            </div>
            <button type="submit" onClick={handleLogin}>Login</button>
        </form>
    </div>
  )
}

export default Login