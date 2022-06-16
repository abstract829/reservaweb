import { Wizard } from 'react-use-wizard'
import ModalComponent from '../Modal'
import ConfirmarHorario from './ConfirmarHorario'
import Month from './Month'
import ReservaBackOfficeForm from './ReservaBackOfficeForm'

const CustomCalendar = () => {
  return (
    <div className="max-w-5xl mx-auto ">
      <ModalComponent btn="ABRIR" content={<ReservaBackOfficeForm />} />
      <ModalComponent btn="ABRIR HORARIO" content={<ConfirmarHorario />} />
      <Month />
    </div>
  )
}
export default CustomCalendar
