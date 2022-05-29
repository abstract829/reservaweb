import { useQueryFunciones } from '../../../hooks/perfiles'
import LoaderWhen from '../../LoaderWhen'
import Alert from '../../Alert'
import DisplayFunciones from './DisplayFunciones'
const Funciones = ({ id }) => {
  const { data: funciones, isLoading, isError } = useQueryFunciones()
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  return (
    <LoaderWhen isTrue={isLoading}>
      <div className="max-w-3xl overflow-y-auto max-h-96">
        <DisplayFunciones
          funciones={funciones && funciones.data}
          perfilId={id}
        />
      </div>
    </LoaderWhen>
  )
}
export default Funciones
