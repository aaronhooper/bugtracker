import styled from 'styled-components'
import UserBadge from './UserBadge'

const StyledSection = styled.section`
  background: #ebebeb;
  padding: 15px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
`

export default ({ comment }) => {
  const { body, author } = comment

  return (
    <StyledSection>
      <UserBadge username={author} />
      <p>{body}</p>
    </StyledSection>
  )
}
