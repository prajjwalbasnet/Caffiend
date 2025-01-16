import CoffeeForm from "./components/CoffeeForm"
import Hero from "./components/Hero"
import Layout from "./components/Layout"


function App() {

  const isAuthenticated = false

  const AuthenticatedContent = <>
  </>

  return (
    <Layout>
      <Hero/>
      <CoffeeForm/>
      {isAuthenticated && (AuthenticatedContent)}
    </Layout>
  )
}

export default App
