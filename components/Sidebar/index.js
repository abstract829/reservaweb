import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import Link from 'next/link'
import 'react-pro-sidebar/dist/css/styles.css'

const Sidebar = ({ collapsed }) => {
  return (
    <ProSidebar collapsed={collapsed}>
      <Menu iconShape="square">
        <MenuItem>Dashboard</MenuItem>
        <SubMenu title="Components">
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
