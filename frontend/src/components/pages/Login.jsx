import axios from 'axios'
import { useContext, useRef } from 'react'
import { TokenContext } from '../Root'
import Form from '../Form'
import Button from '../Button'
import Input from '../Input'
import { useNavigate } from 'react-router'
import H1 from '../H1'

export default function LoginPage () {
  const { setToken, setUsername } = useContext(TokenContext)
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const username = usernameRef.current.value
    const password = passwordRef.current.value

    axios.post('http://localhost:3000/api/auth/login', { username, password })
      .then(res => res.data)
      .then(data => data.token)
      .then(token => setToken(token))
      .then(() => setUsername(username))
      .then(() => navigate('/'))
  }

  return (
    <Form action='' onSubmit={handleSubmit}>
      <H1>Login</H1>
      <Input ref={usernameRef} type='text' name='username' id='' placeholder='username' />
      <Input ref={passwordRef} type='password' name='password' id='' placeholder='password' />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}
