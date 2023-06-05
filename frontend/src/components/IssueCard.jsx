import styled from 'styled-components'
import { Link } from 'react-router-dom'
import UserBadge from './UserBadge'
import StatusIndicator from './StatusIndicator'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #1F83DE;
`

const StyledH2 = styled.h2`
  font-size: 1rem;
`

const StyledSection = styled.section`
  background: #ebebeb;
  padding: 15px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
`

export default ({ issue: { title, description, _id, author, status }, linkToComments }) => (
  <StyledSection>
    <UserBadge username={author} />
    <StyledH2>{title}</StyledH2>
    <p>{description}</p>
    <StatusIndicator status={status} />
    {linkToComments && <StyledLink to={`issues/${_id}`}>View comments...</StyledLink>}
  </StyledSection>
)
