import * as Yup from 'yup'
import { useMutateFeriado } from '../../hooks/feriados'
import Alerts from '../Alerts'
import FormikForm from '../FormikForm'
const AddFeriado = ({ closeModal }) => {
  const { mutate: editFeriado, isError, isSuccess } = useMutateFeriado()
  const inputForms = [
    {
      label: 'Fecha',
      type: 'date',
      name: 'Fecha',
    },
  ]
  const initialValues = {
    Fecha: '',
  }
  const validationSchema = Yup.object().shape({
    Fecha: Yup.string().required('Debe ingresar una fecha'),
  })
  const handleSubmit = (values) => {
    const request = {
      FeriadoId: 0,
      ...values,
    }
    editFeriado(request)
  }
  return (
    <div className="w-96">
      <FormikForm
        inputForms={inputForms}
        initialValues={initialValues}
        validationSchema={validationSchema}
        submitFunction={handleSubmit}
        btnText="Guardar"
        closeForm={closeModal}
      />
      <Alerts
        successIf={isSuccess}
        failedIf={isError}
        succesText="Feriado agregado correctamente!"
        failedText="Hubo un error inesperado"
      />
    </div>
  )
}
export default AddFeriado
