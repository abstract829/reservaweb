import DashboardLayout from '../../components/DashboardLayout'
import TablaPerfiles from '../../components/TablaPerfiles'

const ListaPerfilesPage = () => {
  return (
    <div>
      <TablaPerfiles />
    </div>
  )
}
ListaPerfilesPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ListaPerfilesPage
