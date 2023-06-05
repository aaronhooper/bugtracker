import { Link } from 'react-router-dom'
import styled from 'styled-components'
import UserBadge from './UserBadge'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #aaaaaa;
`

const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
  font-size: 0.875rem;
`

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const NavBrand = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  color: black;
`

const AccountLinks = () => (
  <StyledDiv>
    <StyledLink to='/login'>Login</StyledLink>
    <StyledLink to='/register'>Register</StyledLink>
  </StyledDiv>
)

export default function Navbar ({ username }) {
  return (
    <StyledNav>
      <NavBrand to='/'>bugtracker</NavBrand>
      {username ? <UserBadge username={username} /> : <AccountLinks />}
    </StyledNav>
  )
}
