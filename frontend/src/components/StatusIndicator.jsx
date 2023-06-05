import styled from 'styled-components'

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`
const Indicator = styled.div`
    display: inline-block;
    width: 23px;
    height: 23px;
    background: ${({ status }) => status === 'open' ? '#5da271' : '#C84630'};
    border-radius: 50%;
`

const StyledSpan = styled.span`
    opacity: 0.5;
`

export default ({ status }) => {
  return (
    <StyledDiv>
      <Indicator status={status} />
      <StyledSpan>{status}</StyledSpan>
    </StyledDiv>
  )
}
