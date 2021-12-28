import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
// import { register } from '../actions/auth'
import Loader from 'react-loader-spinner'
import Head from 'next/head'

const Register:React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const isAuthenticated = useSelector((state:any) => state.auth.isAuthenticated)
  const loading = useSelector((state:any) => state.auth.loading)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  return (

  )
}

export default Register