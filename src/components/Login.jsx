import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { login } from '../redux/reducers/userSlice'

// Validation Schema
const schema = yup.object({
  username: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be max 32 characters')
    .required('Password is required'),
})

export default function Login() {
  const navigate = useNavigate()

  // Redirect to home if already logged in
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  // Mutation for Login
  const { mutate, isError, isPending, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (credentials) => {
      return axios.post('/login', credentials)
    },
    onSuccess: ({ data }) => {
      const { message, token } = data
      dispatch(login(token))
      toast.success(message)
      reset()
      navigate(-1)
    },
    onError: () => {
      toast.error('Login failed. Please check your credentials.')
    },
  })

  // Form Submission Handler
  const onSubmit = (data) => {
    mutate(data)
  }

  return (
    <main className="grid md:grid-cols-2 items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Image Section */}
      <section className="hidden md:block">
        <img
          className="object-cover w-full h-full"
          src="/login.jpg"
          alt="Login illustration"
        />
      </section>

      {/* Login Form Section */}
      <section className="flex flex-col items-center justify-center p-8 md:p-16 bg-white shadow-lg rounded-lg">
        <h1 className="mb-6 text-4xl font-bold text-gray-800">Login</h1>
        <p className="mb-4 text-gray-600">
          Welcome back! Please login to continue.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          {/* Email Input */}
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Email"
              className="w-full bg-gray-100 py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('username')}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.username?.message}
            </p>
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full bg-gray-100 py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('password')}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-3 rounded-lg text-white font-bold ${
              isPending ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
            } transition duration-300`}
          >
            {isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{' '}
          <NavLink
            to="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Register
          </NavLink>
        </p>
      </section>
    </main>
  )
}
