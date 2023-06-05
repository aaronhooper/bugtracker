import Form from '../Form'
import Button from '../Button'
import Input from '../Input'
import { useRef, useState } from 'react'
import { isEmail, isStrongPassword } from 'validator'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router'
import H1 from '../H1'

const ErrorMessage = styled.li`
  color: red;
`

const StyledUl = styled.ul`
  text-align: left;
`

const ErrorMessageList = ({ messages }) => {
  return (
    <StyledUl>
      {messages.map((message, index) =>
        <ErrorMessage key={index}>{message}</ErrorMessage>)}
    </StyledUl>
  )
}

export default () => {
  const usernameRef = useRef('')
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const confirmPasswordRef = useRef('')
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const currentErrors = []
    const username = usernameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const confirmPassword = confirmPasswordRef.current.value
    const passwordOptions = {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0
    }

    if (!isEmail(email)) {
      currentErrors.push('Please enter a valid email address.')
    }

    if (password !== confirmPassword) {
      currentErrors.push('Passwords must match.')
    }

    if (!isStrongPassword(password, passwordOptions)) {
      currentErrors.push('Password must be at least 8 characters in length.')
    }

    if (Object.keys(currentErrors).length === 0) {
      try {
        await axios.post('http://localhost:3000/api/auth/register', { username, password, email })
        navigate('/login')
      } catch (err) {
        setErrors(prev => [...prev, err.response.data.message])
      }
    }
  }

  return (
    <>
      <ErrorMessageList messages={errors} />
      <Form action='' onSubmit={handleSubmit}>
        <H1>Register</H1>
        <Input ref={usernameRef} type='text' name='username' id='' placeholder='username' />
        <Input ref={emailRef} type='email' name='email' id='' placeholder='email' />
        <Input ref={passwordRef} type='password' name='password' id='' placeholder='password' />
        <Input ref={confirmPasswordRef} type='password' name='confirm-password' id='' placeholder='confirm password' />
        <Button type='submit'>Create</Button>
      </Form>
    </>
  )
}
