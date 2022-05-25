import Funcion from './Funcion'

const SubModulo = ({ subModulo, myFunciones, perfil }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <h3 className="px-2 py-1 my-4 text-white bg-primary">
          {subModulo.nombre}
        </h3>
        {subModulo.mis_funciones.map((funcion) => (
          <Funcion
            funcion={funcion}
            key={funcion.id}
            myFunciones={myFunciones}
            perfil={perfil}
          />
        ))}
      </div>
    </div>
  )
}
export default SubModulo
