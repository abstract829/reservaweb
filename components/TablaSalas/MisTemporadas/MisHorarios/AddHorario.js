import * as Yup from 'yup'
import { useMutateSala } from '../../../../hooks/salas'
import Alerts from '../../../Alerts'
import FormikForm from '../../../FormikForm'

const AddHorario = ({ sala, temporada }) => {
  const { mutate: editSala, isError, isSuccess } = useMutateSala()
  const inputForms = [
    {
      label: 'Horario',
      type: 'text',
      name: 'Horario',
    },
    {
      label: 'Disponible',
      type: 'select',
      name: 'Disponible',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
  ]
  const initialValues = {
    Horario: '',
    Disponible: 'SI',
  }
  const validationSchema = Yup.object().shape({
    Horario: Yup.string().required('Debe ingresar un horario'),
    Disponible: Yup.string().required('El campo es obligatorio'),
  })
  const handleSubmit = (values) => {
    const request = {
      ...sala,
      MisTemporadas: sala.MisTemporadas.map((t) => {
        if (t.SalaTemporadaId === temporada.SalaTemporadaId) {
          return {
            ...t,
            MisHorarios: [...t.MisHorarios, values],
          }
        } else {
          return t
        }
      }),
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
        succesText="Horario agregado correctamente!"
        failedText="Hubo un error inesperado"
      />
    </div>
  )
}
export default AddHorario
