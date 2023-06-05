import { useRef, useContext } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import Form from '../Form'
import H1 from '../H1'
import Input from '../Input'
import Textarea from '../Textarea'
import Button from '../Button'
import axios from 'axios'
import { TokenContext } from '../Root'

export function loader ({ params }) {
  const { username, project_name } = params
  return { username, project_name }
}

export default function NewIssue () {
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const navigate = useNavigate()
  const { token, username: author } = useContext(TokenContext)
  const { username, project_name: projectName } = useLoaderData()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const title = titleRef.current.value
    const description = descriptionRef.current.value

    await axios.post(
      `http://localhost:3000/api/users/${username}/projects/${projectName}/issues`,
      { title, description, author },
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
        <H1>New Issue</H1>
        <Input ref={titleRef} type='text' name='issueName' placeholder='name' />
        <Textarea ref={descriptionRef} name='description' placeholder='description' />
        <Button type='submit'>Create</Button>
      </Form>
    </>
  )
}
