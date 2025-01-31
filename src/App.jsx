import CoffeeForm from "./components/CoffeeForm"
import Hero from "./components/Hero"
import Layout from "./components/Layout"
import Stats from "./components/Stats"
import History from "./components/History"
import { useAuth } from "./context/AuthContext"


function App() {
  const { globalUser, globalData, isLoading } = useAuth()
  const isAuthenticated = globalUser
  const isData = globalData && !!Object.keys(globalData || {}).length

  const AuthenticatedContent = (
    <>
      <Stats/>
      <History />
    </>
  )

  return (
    <Layout>
      <Hero/>
      <CoffeeForm isAuthenticated={isAuthenticated}/>
      {(isAuthenticated && isLoading) && (
        <p>Loading...</p>
      )}
      {(isAuthenticated && isData) && (AuthenticatedContent)}
    </Layout>
  )
}

export default App
