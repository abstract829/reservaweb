import {
  fetchGuardarPerfil,
  fetchListarModulos,
  fetchObtenerPerfilPorId,
} from '../../../services/user'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useEffect } from 'react'
import useSelecteds from '../../../hooks/useSelecteds'
import LoaderWhen from '../../LoaderWhen'
import Modulo from './Modulo'
import Alerts from '../../Alerts'
const Funciones = ({ perfil }) => {
  const { setSelectedPerfil, selectedPerfil } = useSelecteds()
  const queryClient = useQueryClient()
  const allFunciones = useQuery(['allFunciones'], fetchListarModulos)
  const fullPerfil = useQuery(['perfil', perfil.PerfilId], () =>
    fetchObtenerPerfilPorId({ id: perfil.PerfilId })
  )
  const {
    mutate: editPerfil,
    isError,
    isSuccess,
  } = useMutation(fetchGuardarPerfil, {
    onSuccess: () => {
      queryClient.invalidateQueries(['perfil', perfil.PerfilId])
    },
  })
  useEffect(() => {
    if (fullPerfil.data) {
      setSelectedPerfil(fullPerfil.data.data)
    }
  }, [fullPerfil.data])
  if (allFunciones.isLoading || fullPerfil.isLoading) {
    return (
      <LoaderWhen isTrue={allFunciones.isLoading || fullPerfil.isLoading} />
    )
  }
  if (allFunciones.isError || fullPerfil.isError) {
    return <p>Hubo un error inesperado</p>
  }
  const handleSave = () => {
    editPerfil(selectedPerfil)
  }
  return (
    <>
      <div className="max-w-3xl">
        {allFunciones.data &&
          allFunciones.data.data.map((modulo) => (
            <Modulo modulo={modulo} key={modulo.id} />
          ))}
      </div>
      <button
        onClick={handleSave}
        className="w-full mt-8 font-bold uppercase button"
      >
        Guardar
      </button>
      <Alerts
        successIf={isSuccess}
        failedIf={isError}
        succesText="Funciones editadas correctamente!"
        failedText="Hubo un error inesperado"
      />
    </>
  )
}
export default Funciones
