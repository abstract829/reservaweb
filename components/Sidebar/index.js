import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import Link from 'next/link'
import 'react-pro-sidebar/dist/css/styles.css'

const Sidebar = ({ collapsed }) => {
  const menus = [
    {
      name: 'Usuarios',
      routes: [
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
      ],
    },
    {
      name: 'Salas',
      routes: [
        {
          name: 'Lista de salas',
          path: '/dashboard/lista-salas',
        },
        {
          name: 'Lista de feriados',
          path: '/dashboard/lista-feriados',
        },
      ],
    },
    {
      name: 'Empresas',
      routes: [
        {
          name: 'Lista de empresas',
          path: '/dashboard/lista-empresas',
        },
        {
          name: 'Lista de usuarios',
          path: '/dashboard/lista-usuariosempresa',
        },
      ],
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
        {menus.map((menu) => (
          <SubMenu key={menu.name} title={menu.name} defaultOpen={true}>
            {menu.routes.map((route) => (
              <MenuItem key={route.name}>
                <Link href={route.path}>
                  <a>{route.name}</a>
                </Link>
              </MenuItem>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </ProSidebar>
  )
}
export default Sidebar
