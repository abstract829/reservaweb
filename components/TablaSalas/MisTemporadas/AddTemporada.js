import * as Yup from 'yup'
import { useMutateSala } from '../../../hooks/salas'
import Alerts from '../../Alerts'
import FormikForm from '../../FormikForm'
const AddTemporada = ({ sala, closeModal }) => {
  const { mutate: editSala, isError, isSuccess } = useMutateSala()
  const inputForms = [
    {
      label: 'Fecha de inicio',
      type: 'date',
      name: 'FechaDesde',
    },
    {
      label: 'Fecha de fin',
      type: 'date',
      name: 'FechaHasta',
    },
    {
      label: 'Comentario',
      type: 'textarea',
      name: 'Comentario',
      placeholder: 'Deja un comentario...',
    },
  ]
  const initialValues = {
    FechaDesde: '',
    FechaHasta: '',
    Comentario: '',
  }
  const validationSchema = Yup.object().shape({
    FechaDesde: Yup.string().required('Debe ingresar una fecha de inicio'),
    FechaHasta: Yup.string().required('Debe ingresar una fecha de fin'),
    Comentario: Yup.string().max(
      100,
      'El comentario no debe tener mas de 100 caracteres'
    ),
  })
  const handleSubmit = (values) => {
    const request = {
      ...sala,
      MisTemporadas: [
        ...sala.MisTemporadas,
        {
          ...values,
        },
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
        closeForm={closeModal}
      />
      <Alerts
        successIf={isSuccess}
        failedIf={isError}
        succesText="Temporada creada correctamente!"
        failedText="Hubo un error inesperado"
      />
    </div>
  )
}
export default AddTemporada
