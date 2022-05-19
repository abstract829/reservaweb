import { useRouter } from 'next/router'
import { useEffect } from 'react'
const Home = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/auth/sign-in')
  }, [])
  return null
}

export default Home
