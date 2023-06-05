import Form from '../Form'
import Input from '../Input'
import Button from '../Button'
import { useContext, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { TokenContext } from '../Root'
import H1 from '../H1'

export default function NewProject () {
  const projectNameRef = useRef(null)
  const navigate = useNavigate()
  const { username } = useContext(TokenContext)
  const { token } = useContext(TokenContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const projectName = projectNameRef.current.value

    await axios.post(
      'http://localhost:3000/api/me/projects',
      { name: projectName },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    navigate(`/${username}/${projectName}`)
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <H1>New Project</H1>
        <Input ref={projectNameRef} type='text' name='projectName' placeholder='name' />
        <Button type='submit'>Create</Button>
      </Form>
    </>
  )
}
