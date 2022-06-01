import DashboardLayout from '../../components/DashboardLayout'
import TablaEmpresas from '../../components/TablaEmpresas'

const ListaEmpresasPage = () => {
  return (
    <div>
      <TablaEmpresas />
    </div>
  )
}
ListaEmpresasPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ListaEmpresasPage
