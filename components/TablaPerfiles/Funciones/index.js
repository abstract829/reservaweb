import { useQuery } from 'react-query'
import {
  fetchListarFunciones,
  fetchListarModulos,
} from '../../../services/user'
import LoaderWhen from '../../LoaderWhen'
import Modulo from './Modulo'
const Funciones = ({ perfil }) => {
  const allFunciones = useQuery(['allFunciones'], fetchListarModulos)
  const myFunciones = useQuery(['myFunciones'], fetchListarFunciones)
  if (allFunciones.isLoading || myFunciones.isLoading) {
    return (
      <LoaderWhen isTrue={allFunciones.isLoading || myFunciones.isLoading} />
    )
  }
  const handleSave = () => {
    console.log(perfil)
  }
  return (
    <>
      <div className="w-96">
        {allFunciones.data &&
          allFunciones.data.data.map((modulo) => (
            <Modulo
              modulo={modulo}
              key={modulo.id}
              myFunciones={myFunciones}
              perfil={perfil}
            />
          ))}
      </div>
      <button
        onClick={handleSave}
        className="w-full mt-8 font-bold uppercase button"
      >
        Guardar
      </button>
    </>
  )
}
export default Funciones
