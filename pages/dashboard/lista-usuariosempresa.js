import DashboardLayout from '../../components/DashboardLayout'
import TablaUsuariosEmpresa from '../../components/TablaUsuariosEmpresa'

const ListaUsuariosEmpresaPage = () => {
  return (
    <div>
      <TablaUsuariosEmpresa />
    </div>
  )
}
ListaUsuariosEmpresaPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ListaUsuariosEmpresaPage
