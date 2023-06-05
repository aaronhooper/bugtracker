import styled from 'styled-components'

const getInitial = (username) => username.at(0).toUpperCase()

const getHashOfString = (str) => {
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  hash = Math.abs(hash)
  return hash
}

const normalizeHash = (hash, min, max) => {
  return Math.floor((hash % (max - min)) + min)
}

const generateHSL = (name) => {
  const hRange = [0, 360]
  const sRange = [50, 75]
  const lRange = [25, 60]

  const hash = getHashOfString(name)
  const h = normalizeHash(hash, hRange[0], hRange[1])
  const s = normalizeHash(hash, sRange[0], sRange[1])
  const l = normalizeHash(hash, lRange[0], lRange[1])
  return [h, s, l]
}

const HSLtoString = (hsl) => {
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`
}

const UserAvatar = styled.div`
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  width: 23px;
  height: 23px;
  background-color: ${({ username }) => HSLtoString(generateHSL(username))};

  &:before {
    content: "${({ username }) => getInitial(username)}";
    color: white;
  }
`

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`

export default ({ username }) => {
  return (
    <StyledDiv>
      <UserAvatar username={username} />
      <span>{username}</span>
    </StyledDiv>
  )
}
