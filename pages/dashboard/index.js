import DashboardLayout from '../../components/DashboardLayout'

const DashboardPage = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}
DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default DashboardPage
