import { useLoaderData, Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import H1 from '../H1'
import IssueCard from '../IssueCard'
import AddButton from '../AddButton'
import { useContext } from 'react'
import { TokenContext } from '../Root'

export async function loader ({ params: { username, project_name } }) {
  const res = await axios.get(`http://localhost:3000/api/users/${username}/projects/${project_name}/`)
  const project = res.data
  console.log(res.data)
  return { ...project, username }
}

const StyledH1 = styled(H1)`
  color: #1F83DE;
  margin-bottom: 20px;
`

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`

const StyledAddButton = styled(AddButton)`
  text-decoration: none;
`

const IssuesList = ({ issues }) =>
  <StyledDiv>{issues.map((issue, index) => <IssueCard key={index} issue={issue} linkToComments />)}</StyledDiv>

export default function ProjectPage () {
  const { name, issues, username } = useLoaderData()
  const { username: userLoggedIn } = useContext(TokenContext)

  return (
    <article>
      <StyledH1>{username}/{name}</StyledH1>
      {userLoggedIn && <StyledAddButton as={Link} to='issues/new'>Create Issue</StyledAddButton>}
      {issues ? <IssuesList issues={issues} /> : <p>This project has no issues.</p>}
    </article>
  )
}
