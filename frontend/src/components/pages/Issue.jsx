import { useLoaderData } from 'react-router'
import IssueCard from '../IssueCard'
import axios from 'axios'
import H1 from '../H1'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import CommentCard from '../CommentCard'
import AddButton from '../AddButton'
import { useContext } from 'react'
import { TokenContext } from '../Root'

export async function loader ({ params }) {
  const { username, project_name: projectName, issue_id: issueId } = params

  const res = await axios.get(`http://localhost:3000/api/users/${username}/projects/${projectName}/`)
  const data = res.data
  console.log(data)

  const issue = data.issues.find((issue) => issue._id === issueId)
  return { issue, projectName, username }
}

const StyledLink = styled(Link)`
  display: inline-block;
`

const StyledH1 = styled(H1)`
  color: #1F83DE;
  text-decoration: none;
  margin-bottom: 12px;
`

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
`

const AddCommentButton = styled(AddButton)`
  text-decoration: none;
  margin-top: 12px;
`

const CommentsList = ({ comments }) =>
  <StyledDiv>
    {comments.map((comment, index) => <CommentCard key={index} comment={comment} />)}
  </StyledDiv>

export default () => {
  const { issue, projectName, username } = useLoaderData()
  const { comments } = issue
  const { token } = useContext(TokenContext)

  return (
    <article>
      <StyledH1 as={StyledLink} to={`/${username}/${projectName}`}>{username}/{projectName}</StyledH1>
      <IssueCard issue={issue} />
      {token && <AddCommentButton as={StyledLink} to='comments/new'>Add Comment</AddCommentButton>}
      {comments ? <CommentsList comments={comments} /> : <p>This issue has no comments.</p>}
    </article>
  )
}
