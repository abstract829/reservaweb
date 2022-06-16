import CalendarBackoffice from '../../components/CalendarBackoffice'
import DashboardLayout from '../../components/DashboardLayout'
import TablaUsuariosEmpresa from '../../components/TablaUsuariosEmpresa'

const ReservaCalendarioPage = () => {
  return (
    <div>
      <CalendarBackoffice />
    </div>
  )
}
ReservaCalendarioPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ReservaCalendarioPage
