import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

// Validation schema using Yup
const schema = yup.object({
  username: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password cannot exceed 32 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
})

export default function Register() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (credentials) => {
      return axios.post('/register', credentials)
    },
    onSuccess: ({ data }) => {
      const { message } = data
      toast.success(message)
      reset()
      navigate('/login')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Registration failed')
    },
  })

  const onSubmit = (data) => {
    mutate(data)
  }

  return (
    <main className="grid md:grid-cols-2 min-h-screen items-center bg-gradient-to-r from-blue-50 via-gray-100 to-blue-100">
      {/* Left Section: Image */}
      <section className="hidden md:block p-10">
        <img
          src="/register.jpg"
          alt="Register Illustration"
          className="w-full h-auto object-cover rounded-2xl shadow-lg"
        />
      </section>

      {/* Right Section: Form */}
      <section className="flex items-center justify-center flex-col px-8 py-16 bg-white/70 shadow-lg rounded-lg md:rounded-none">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Create Account
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md flex flex-col gap-6"
        >
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('username')}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col gap-2">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </button>

          {/* Link to Login */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <NavLink
              to="/login"
              className="text-blue-500 hover:underline hover:underline-offset-2"
            >
              Login
            </NavLink>
          </p>
        </form>
      </section>
    </main>
  )
}
