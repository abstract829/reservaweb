import DashboardLayout from '../../components/DashboardLayout'
import TablaUsuarios from '../../components/TablaUsuarios'

const ListaUsuariosPage = () => {
  return (
    <div>
      <TablaUsuarios />
    </div>
  )
}
ListaUsuariosPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ListaUsuariosPage
