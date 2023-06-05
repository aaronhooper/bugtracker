import ProjectCard from '../ProjectCard'
import AddButton from '../AddButton'
import axios from 'axios'
import { Link, useLoaderData } from 'react-router-dom'
import styled from 'styled-components'
import { useContext } from 'react'
import { TokenContext } from '../Root'

export async function loader () {
  const res = await axios.get('http://localhost:3000/api/users')
  const users = res.data.users

  const projects = users.flatMap(({ username, projects }) =>
    projects.map((project) => ({ ...project, username })))
  return projects
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 810px) {
    flex-direction: row;
  }
`

const StyledAddButton = styled(AddButton)`
  margin-bottom: 12px;
`

export function ProjectsList () {
  const projects = useLoaderData()

  return (
    <StyledDiv>
      {projects.map((project, index) =>
        <ProjectCard key={index} project={project} />)}
    </StyledDiv>
  )
}

const NewProjectButton = () => {
  return (
    <Link to='/projects/new'>
      <StyledAddButton>Create Project</StyledAddButton>
    </Link>
  )
}

export default function ProjectsPage () {
  const { token } = useContext(TokenContext)

  return (
    <>
      {token && <NewProjectButton />}
      <ProjectsList />
    </>
  )
}
