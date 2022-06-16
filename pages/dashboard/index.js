import { useRouter } from 'next/router'
import { useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'

const DashboardPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/dashboard/lista-usuarios')
  }, [])
  return null
}
DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default DashboardPage
