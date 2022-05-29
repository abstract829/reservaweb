import * as Yup from 'yup'
import { useMutateSala } from '../../../hooks/salas'
import Alerts from '../../Alerts'
import FormikForm from '../../FormikForm'
const AddFecha = ({ sala }) => {
  const { mutate: editSala, isError, isSuccess } = useMutateSala()
  const inputForms = [
    {
      label: 'Fecha',
      type: 'date',
      name: 'Fecha',
    },
    {
      label: 'Motivo',
      type: 'textarea',
      name: 'Motivo',
      placeholder: 'Describe el motivo...',
    },
  ]
  const initialValues = {
    Fecha: '',
    Motivo: '',
  }
  const validationSchema = Yup.object().shape({
    Fecha: Yup.string().required('Debe ingresar una fecha'),
    Motivo: Yup.string().max(
      50,
      'El motivo no debe tener mas de 50 caracteres'
    ),
  })
  const handleSubmit = (values) => {
    const request = {
      ...sala,
      MisFechasBloqueadas: [
        ...sala.MisFechasBloqueadas,
        { ...values, SalaId: sala.SalaId },
      ],
    }
    editSala(request)
  }
  return (
    <div className="w-96">
      <FormikForm
        inputForms={inputForms}
        initialValues={initialValues}
        validationSchema={validationSchema}
        submitFunction={handleSubmit}
        btnText="Guardar"
      />
      <Alerts
        successIf={isSuccess}
        failedIf={isError}
        succesText="Fecha creada correctamente!"
        failedText="Hubo un error inesperado"
      />
    </div>
  )
}
export default AddFecha
