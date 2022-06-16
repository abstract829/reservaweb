import Sidebar from './Sidebar'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-100">
      <div className="fixed h-full">
        <Sidebar />
      </div>
      <div className="ml-[270px] w-full">
        <div className="px-4 py-4 mt-12 lg:px-4">
          <div className="p-8 shadow">{children}</div>
        </div>
      </div>
    </div>
  )
}
export default DashboardLayout
