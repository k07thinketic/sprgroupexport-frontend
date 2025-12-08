import api from '@/lib/axios'

const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email })
  return response
}

const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response
}

const register = async (userData) => {
  const response = await api.post('/auth/signup', userData)
  return response
}

const verifyOTP = async (email, otp) => {
  const response = await api.post('/auth/verify-otp', { email, otp })
  return response
}

const resetPassword = async ({ email, newPassword }) => {
  const response = await api.post('/auth/reset-password', {
    email,
    newPassword,
  })
  return response.data
}

const resendOTP = async ({ email }) => {
  const response = await api.post('/auth/resend-otp', { email })
  return response.data
}

export const authService = {
  forgotPassword,
  login,
  register,
  verifyOTP,
  resetPassword,
  resendOTP,
}
