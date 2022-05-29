import { useMutateSala } from '../../hooks/salas'
import FormikForm from '../FormikForm'
import * as Yup from 'yup'
import Alerts from '../Alerts'
const AddSala = () => {
  const { mutate: editSala, isErrorMutating, isSuccess } = useMutateSala()
  const inputForms = [
    {
      label: 'Nombre',
      type: 'text',
      name: 'Nombre',
      placeholder: 'Nombre',
    },
    {
      label: 'Disponible Online',
      type: 'select',
      name: 'DisponibleOnLine',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
    {
      label: 'Activo',
      type: 'select',
      name: 'Activo',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
  ]
  const initialValues = {
    Nombre: '',
    DisponibleOnLine: 'SI',
    Activo: 'SI',
  }
  const validationSchema = Yup.object().shape({
    Nombre: Yup.string().max(255).required('Debe ingresar un nombre'),
    Activo: Yup.string().required('Seleccione una opción'),
    DisponibleOnLine: Yup.string().required('Seleccione una opción'),
  })
  const handleSubmit = (values) => {
    const request = {
      ...values,
      MisTemporadas: [
        {
          FechaDesde: '2022-01-01T00:00:00',
          FechaHasta: '2022-01-01T00:00:00',
          Comentario: 'Crea una nueva temporada para eliminar esta',
          MisHorarios: [
            {
              Horario: '00:00',
              Disponible: 'NO',
            },
          ],
        },
      ],
      MisFechasBloqueadas: [],
      DiasBloqueados: {
        Lunes: 'NO',
        Martes: 'NO',
        Miercoles: 'NO',
        Jueves: 'NO',
        Viernes: 'NO',
        Sabado: 'NO',
        Domingo: 'NO',
        Sala: 'NO',
      },
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
        failedIf={isErrorMutating}
        succesText="Sala creada correctamente!"
        failedText="Hubo un error inesperado"
      />
    </div>
  )
}
export default AddSala
