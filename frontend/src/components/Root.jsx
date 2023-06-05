import { createContext, useState } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 18px;
  }

  body {
    font-family: 'Inter', sans-serif;
    padding: 15px;
    font-weight: 300;
  }
`

export const TokenContext = createContext({})

export default function Root () {
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState('')

  return (
    <TokenContext.Provider value={{ token, setToken, username, setUsername }}>
      <GlobalStyle />
      <Navbar username={username} />
      <main>
        <Outlet />
      </main>
    </TokenContext.Provider>
  )
}
