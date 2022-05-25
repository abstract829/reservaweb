import FormikForm from '../FormikForm'
import * as Yup from 'yup'
import { fetchGuardarSala } from '../../services/salas'
import { useMutation, useQueryClient } from 'react-query'
import Alerts from '../Alerts'
const DiasBloqueados = ({ sala }) => {
  console.log(sala)
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
      label: 'Lunes',
      type: 'select',
      name: 'Lunes',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
    {
      label: 'Martes',
      type: 'select',
      name: 'Martes',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
    {
      label: 'Miercoles',
      type: 'select',
      name: 'Miercoles',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
    {
      label: 'Jueves',
      type: 'select',
      name: 'Jueves',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
    {
      label: 'Viernes',
      type: 'select',
      name: 'Viernes',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
    {
      label: 'Sabado',
      type: 'select',
      name: 'Sabado',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
    {
      label: 'Domingo',
      type: 'select',
      name: 'Domingo',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
  ]
  const initialValues = {
    Lunes: sala.DiasBloqueados.Lunes ? sala.DiasBloqueados.Lunes : 'NO',
    Martes: sala.DiasBloqueados.Martes ? sala.DiasBloqueados.Martes : 'NO',
    Miercoles: sala.DiasBloqueados.Miercoles
      ? sala.DiasBloqueados.Miercoles
      : 'NO',
    Jueves: sala.DiasBloqueados.Jueves ? sala.DiasBloqueados.Jueves : 'NO',
    Viernes: sala.DiasBloqueados.Viernes ? sala.DiasBloqueados.Viernes : 'NO',
    Sabado: sala.DiasBloqueados.Sabado ? sala.DiasBloqueados.Sabado : 'NO',
    Domingo: sala.DiasBloqueados.Domingo ? sala.DiasBloqueados.Domingo : 'NO',
  }
  const validationSchema = Yup.object().shape({
    Lunes: Yup.string().required('Selecciona una opción'),
    Martes: Yup.string().required('Selecciona una opción'),
    Miercoles: Yup.string().required('Selecciona una opción'),
    Jueves: Yup.string().required('Selecciona una opción'),
    Viernes: Yup.string().required('Selecciona una opción'),
    Sabado: Yup.string().required('Selecciona una opción'),
    Domingo: Yup.string().required('Selecciona una opción'),
  })
  const handleSubmit = (values) => {
    const request = {
      ...sala,
      DiasBloqueados: {
        ...sala.DiasBloqueados,
        ...values,
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
        failedIf={isError}
        succesText="Sala editada correctamente!"
        failedText="Hubo un error inesperado"
      />
    </div>
  )
}
export default DiasBloqueados
