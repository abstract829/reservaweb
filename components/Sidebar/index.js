import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import Link from 'next/link'
import 'react-pro-sidebar/dist/css/styles.css'

const Sidebar = ({ collapsed }) => {
  const menuUsuarios = [
    {
      name: 'Home',
      path: '/dashboard',
    },
    {
      name: 'Lista de usuarios',
      path: '/dashboard/lista-usuarios',
    },
    {
      name: 'Lista de perfiles',
      path: '/dashboard/lista-perfiles',
    },
  ]
  const menuSalas = [
    {
      name: 'Lista de salas',
      path: '/dashboard/lista-salas',
    },
    {
      name: 'Lista de feriados',
      path: '/dashboard/lista-feriados',
    },
  ]
  return (
    <ProSidebar collapsed={collapsed}>
      <Menu iconShape="square">
        <MenuItem>
          <div className="flex flex-col items-center justify-center">
            <img src="/imgs/logo.png" className="w-8" />
            <span className="relative text-xl font-bold uppercase bottom-5">
              Don Melchor
            </span>
          </div>
        </MenuItem>
        <SubMenu title="Usuarios" defaultOpen={true}>
          {menuUsuarios.map((menu) => (
            <MenuItem key={menu.name}>
              <Link href={menu.path}>
                <a>{menu.name}</a>
              </Link>
            </MenuItem>
          ))}
        </SubMenu>
        <SubMenu title="Salas" defaultOpen={true}>
          {menuSalas.map((menu) => (
            <MenuItem key={menu.name}>
              <Link href={menu.path}>
                <a>{menu.name}</a>
              </Link>
            </MenuItem>
          ))}
        </SubMenu>
      </Menu>
    </ProSidebar>
  )
}
export default Sidebar
