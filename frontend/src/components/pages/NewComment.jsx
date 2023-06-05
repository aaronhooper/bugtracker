import { useRef, useContext } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { TokenContext } from '../Root'
import axios from 'axios'
import Form from '../Form'
import H1 from '../H1'
import Textarea from '../Textarea'
import Button from '../Button'

export function loader ({ params }) {
  const { username, project_name: projectName, issue_id: issueId } = params
  return { username, projectName, issueId }
}

export default function NewComment () {
  const bodyRef = useRef(null)
  const navigate = useNavigate()
  const { username: author, token } = useContext(TokenContext)
  const { username, projectName, issueId } = useLoaderData()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = bodyRef.current.value

    await axios.post(
      `http://localhost:3000/api/users/${username}/projects/${projectName}/issues/${issueId}/comments`,
      { body, author },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    navigate('..')
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <H1>New Comment</H1>
        <Textarea ref={bodyRef} type='text' name='body' placeholder='type your comment...' />
        <Button type='submit'>Create</Button>
      </Form>
    </>
  )
}
