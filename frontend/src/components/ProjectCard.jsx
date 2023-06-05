import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Issue = ({ title }) => <li>{title}</li>

const StyledIssue = styled(Issue)`
  font-size: 1rem;
`

const StyledList = styled.ul`
  list-style-type: none;
  margin: 5px 0 5px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const StyledArticle = styled.article`
  background: #ebebeb;
  padding: 15px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
`

const StyledH1 = styled.h1`
  font-size: 1.375rem;
  margin: 0;
  color: #1F83DE;
  font-weight: 300;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #1F83DE;
`

const IssuesList = ({ issues }) =>
  <StyledList>
    {issues.map(({ title }, index) => <StyledIssue key={index} title={title} />)}
  </StyledList>

export default function ProjectCard ({ project: { name, issues, username } }) {
  return (
    <StyledArticle>
      <StyledH1>
        <StyledLink to={`/${username}/${name}`}>{username}/{name}</StyledLink>
      </StyledH1>
      <IssuesList issues={issues} />
    </StyledArticle>
  )
}
