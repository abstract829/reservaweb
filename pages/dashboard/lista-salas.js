import DashboardLayout from '../../components/DashboardLayout'
import TablaSalas from '../../components/TablaSalas'

const ListaSalasPage = () => {
  return (
    <div>
      <TablaSalas />
    </div>
  )
}
ListaSalasPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ListaSalasPage
