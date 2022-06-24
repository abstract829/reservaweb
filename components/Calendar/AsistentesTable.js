import useReserva from '../../hooks/useReserva'
import DefaultTable from '../DefaultTable'
import ModalRP from '../ModalRP'
import PlusButton from '../PlusButton'
import AddAsistente from './AddAsistente'
import EditAsistente from './EditAsistente'

export default function AsistentesTable() {
  const {
    reservaRequest: { Asistentes },
  } = useReserva()
  const columns = [
    'Nombre',
    'Fecha de Nacimiento',
    'Email',
    'Genero',
    'Ciudad',
    'Pais',
    'RUT',
    'Telefono',
  ]
  return (
    <>
      <ModalRP title="Agregar Asistente" btn={<PlusButton />}>
        {(closeModal) => <AddAsistente closeModal={closeModal} />}
      </ModalRP>

      <DefaultTable columns={columns} extra={1}>
        {Asistentes.length > 0 &&
          Asistentes.map((asistente, i) => (
            <tr key={i} className="bg-white border-b ">
              <td className="td-default">{asistente.NombreCompleto}</td>
              <td className="td-default">{asistente.FechaNacimiento}</td>
              <td className="td-default">{asistente.CorreoElectronico}</td>
              <td className="td-default">{asistente.Genero}</td>
              <td className="td-default">{asistente.Ciudad}</td>
              <td className="td-default">{asistente.PaisId}</td>
              <td className="td-default">{asistente.NumeroDocumento}</td>
              <td className="td-default">{asistente.Telefono}</td>
              <td className="td-default">
                <ModalRP
                  title="Editar Asistente"
                  btn={<span className="td-edited">Editar</span>}
                >
                  {(closeModal) => (
                    <EditAsistente
                      closeModal={closeModal}
                      asistente={asistente}
                    />
                  )}
                </ModalRP>
              </td>
            </tr>
          ))}
      </DefaultTable>
    </>
  )
}
