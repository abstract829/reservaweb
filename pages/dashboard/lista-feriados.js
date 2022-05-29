import DashboardLayout from '../../components/DashboardLayout'
import TablaFeriados from '../../components/TablaFeriados'

const ListaFeriadosPage = () => {
  return (
    <div>
      <TablaFeriados />
    </div>
  )
}
ListaFeriadosPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ListaFeriadosPage
