import { useEditReserva } from '../../hooks/reservas'
import Alerts from '../Alerts'
import NewForm from '../FormikForm/NewForm'
const EditarReserva = ({ precio = '', closeModal, sala }) => {
  const { mutate: editReserva, isError, isSuccess } = useEditReserva()
  const validateValue = (value) => {
    if (value) return value
    return ''
  }
  const form = [
    {
      label: 'Idioma',
      type: 'select',
      name: 'Idioma',
      options: [
        {
          value: 'Español',
          text: 'Español',
        },
        {
          value: 'Inglés',
          text: 'Inglés',
        },
        {
          value: 'Portugues',
          text: 'Portugues',
        },
      ],
      value: sala.Idioma,
      validations: [{ type: 'required' }],
    },
    {
      label: 'Cantidad de asistentes',
      type: 'number',
      name: 'CantidadPersonas',
      value: sala.CantidadPersonas,
      validations: [{ type: 'required' }],
    },
    {
      label: 'Area Solicitante',
      type: 'text',
      name: 'AreaSolicitante',
      value: validateValue(sala.AreaSolicitante),
    },
    {
      label: 'Requerimientos especiales',
      type: 'textarea',
      name: 'RequerimientosEspeciales',
      value: validateValue(sala.RequerimientosEspeciales),
    },

    {
      label: 'Cantidad de personal de CyT',
      type: 'text',
      name: 'PersonalCyt',
      value: validateValue(sala.PersonalCyt),
    },
    {
      label: 'Enologo Sommelier',
      type: 'text',
      name: 'EnologoSommelier',
      value: validateValue(sala.EnologoSommelier),
    },
    {
      label: 'Encargado del Tour',
      type: 'text',
      name: 'EncargadoTour',
      value: validateValue(sala.EncargadoTour),
    },
    {
      label: 'Lugar Almuerzo y Cena',
      type: 'text',
      name: 'LugarAlmuerzoCena',
      value: validateValue(sala.LugarAlmuerzoCena),
    },
    {
      label: 'Comentarios del Lugar Almuerzo y Cena',
      type: 'textarea',
      name: 'ComentarioLugarAlmuerzoCena',
      value: validateValue(sala.ComentarioLugarAlmuerzoCena),
    },
    {
      label: 'Copas de Degustacion',
      type: 'text',
      name: 'CopasDegustacion',
      value: validateValue(sala.CopasDegustacion),
    },
    {
      label: 'Estado Vinos de Degustacion',
      type: 'select',
      name: 'EstadoVinosDegustacion',
      options: [
        {
          value: 'No solicitados',
          text: 'No solicitados',
        },
        {
          value: 'Solicitados',
          text: 'Solicitados',
        },
        {
          value: 'Recibidos',
          text: 'Recibidos',
        },
      ],
      value: validateValue(sala.EstadoVinosDegustacion),
    },
    {
      label: 'Comentario Vinos de Degustacion',
      type: 'textarea',
      name: 'ComentarioVinosDegustacion',
      value: validateValue(sala.ComentarioVinosDegustacion),
    },
    {
      label: 'Estado Vinos de Comidas',
      type: 'select',
      name: 'EstadoVinosComidas',
      options: [
        {
          value: 'No solicitados',
          text: 'No solicitados',
        },
        {
          value: 'Solicitados',
          text: 'Solicitados',
        },
        {
          value: 'Recibidos',
          text: 'Recibidos',
        },
      ],
      value: validateValue(sala.EstadoVinosComidas),
    },
    {
      label: 'Comentario Vinos de Comidas',
      type: 'textarea',
      name: 'ComentarioVinosComidas',
      value: validateValue(sala.ComentarioVinosComidas),
    },
    {
      label: 'Estado Regalos Visitas',
      type: 'select',
      name: 'EstadoRegalosVisitas',
      options: [
        {
          value: 'No solicitados',
          text: 'No solicitados',
        },
        {
          value: 'Solicitados',
          text: 'Solicitados',
        },
        {
          value: 'Recibidos',
          text: 'Recibidos',
        },
      ],
      value: validateValue(sala.EstadoRegalosVisitas),
    },
    {
      label: 'Comentario Regalos Visitas',
      type: 'textarea',
      name: 'ComentarioRegalosVisitas',
      value: validateValue(sala.ComentarioRegalosVisitas),
    },
    {
      label: 'Estado Menu Comidas',
      type: 'select',
      name: 'EstadoMenuComidas',
      options: [
        {
          value: 'No solicitados',
          text: 'No solicitados',
        },
        {
          value: 'Solicitados',
          text: 'Solicitados',
        },
        {
          value: 'Recibidos',
          text: 'Recibidos',
        },
      ],
      value: validateValue(sala.EstadoMenuComidas),
    },
    {
      label: 'Comentarios Menu Comidas',
      type: 'textarea',
      name: 'ComentariosMenuComidas',
      value: validateValue(sala.ComentariosMenuComidas),
    },
    {
      label: 'Comentarios Generales',
      type: 'textarea',
      name: 'ComentariosGenerales',
      value: validateValue(sala.ComentariosGenerales),
    },
  ]
  const handleSubmit = async (values) => {
    editReserva({ ...sala, ...values })
  }

  return (
    <>
      <NewForm
        form={form}
        submitFunction={handleSubmit}
        btnText="Editar"
        closeForm={closeModal}
      />
      <Alerts
        successIf={isSuccess}
        failedIf={isError}
        succesText="Reserva editada correctamente!"
        failedText="Hubo un error inesperado"
      />
    </>
  )
}
export default EditarReserva
