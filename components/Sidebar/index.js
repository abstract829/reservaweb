import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import Link from 'next/link'
import 'react-pro-sidebar/dist/css/styles.css'

const Sidebar = ({ collapsed }) => {
  return (
    <ProSidebar collapsed={collapsed}>
      <Menu iconShape="square">
        <MenuItem>
          <div className="flex flex-col items-center justify-center">
            <img src="/imgs/logo.png" className="w-8" />
            <span className="relative bottom-5 text-xl font-bold uppercase">
              Don Melchor
            </span>
          </div>
        </MenuItem>
        <SubMenu title="Administración">
          <MenuItem>
            <Link href="/dashboard">
              <a>Home</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/dashboard/lista-usuarios">
              <a>Lista de usuarios</a>
            </Link>
          </MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  )
}
export default Sidebar
