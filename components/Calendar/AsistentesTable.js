import useReserva from '../../hooks/useReserva'
import DefaultTable from '../DefaultTable'
import ModalComponent from '../Modal'
import PlusButton from '../PlusButton'
import AddAsistente from './AddAsistente'

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
      <ModalComponent
        title="Agregar Asistente"
        btn={<PlusButton />}
        content={<AddAsistente />}
      />
      <DefaultTable columns={columns}>
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
            </tr>
          ))}
      </DefaultTable>
    </>
  )
}
