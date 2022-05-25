import FormikForm from '../FormikForm'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from 'react-query'
import { fetchGuardarSala } from '../../services/salas'
import Alerts from '../Alerts'
const EditSala = ({ sala }) => {
  const queryClient = useQueryClient()
  const {
    mutate: editSala,
    isError,
    isSuccess,
  } = useMutation(fetchGuardarSala, {
    onSuccess: () => {
      queryClient.invalidateQueries('listaSalas')
    },
  })
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
    Nombre: sala.Nombre,
    DisponibleOnLine: sala.DisponibleOnLine,
    Activo: sala.Activo,
  }
  const validationSchema = Yup.object().shape({
    Nombre: Yup.string().max(255).required('Debe ingresar un nombre'),
    Activo: Yup.string().required('Seleccione una opción'),
    DisponibleOnLine: Yup.string().required('Seleccione una opción'),
  })
  const handleSubmit = (values) => {
    const request = {
      ...sala,
      ...values,
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
        succesText="Sala editada correctamente!"
        failedText="Hubo un error inesperado"
      />
    </div>
  )
}
export default EditSala
