import { createBrowserRouter } from 'react-router-dom'
import Root from './components/Root.jsx'
import ProjectsPage, { loader as projectsLoader } from './components/pages/Projects.jsx'
import LoginPage from './components/pages/Login.jsx'
import RegisterPage from './components/pages/Register.jsx'
import ProjectPage, { loader as projectLoader } from './components/pages/Project.jsx'
import NewProjectPage from './components/pages/NewProject.jsx'
import Issue, { loader as issueLoader } from './components/pages/Issue.jsx'
import NewIssuePage, { loader as newIssueLoader } from './components/pages/NewIssue.jsx'
import NewCommentPage, { loader as newCommentLoader } from './components/pages/NewComment.jsx'

export default createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <ProjectsPage />,
        loader: projectsLoader
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        path: ':username/:project_name',
        loader: projectLoader,
        element: <ProjectPage />
      },
      {
        path: 'projects/new',
        element: <NewProjectPage />
      },
      {
        path: ':username/:project_name/issues/:issue_id',
        element: <Issue />,
        loader: issueLoader
      },
      {
        path: ':username/:project_name/issues/new',
        element: <NewIssuePage />,
        loader: newIssueLoader
      },
      {
        path: ':username/:project_name/issues/:issue_id/comments/new',
        element: <NewCommentPage />,
        loader: newCommentLoader
      }
    ]
  }
])
