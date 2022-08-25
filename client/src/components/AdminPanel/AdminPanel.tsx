import React from 'react'
import adminImage from '../../media/Admin.png'
import { Events } from '../AdminComponents/Eventos/Events'
import ModalAdminOptions from '../ModalAdminOptions/ModalAdminOptions'
import Navbar from '../Navbar'

export default function AdminPanel() {
  return (
    <>
      <Navbar />
      <div className="container bg-mikeBlack mx-0 pl-0 pr-2">
        <div className="flex justify-between">
          <div className="h-3 w-auto relative">
            <h1 className="text-mikeWhite text-4xl ml-6 absolute top-1/2 w-96">Gestión de la Aplicación</h1>
          </div>

          {/* <img className="h-11 cursor-pointer" src={adminImage} alt="admin profile picture" /> */}
          <ModalAdminOptions />
        </div>
      </div>
      <div className="bg-slate-700 min max-h-screen pointer">
        <div className="h-screen ">
          <div className="w-96 ml-6 pt-6">
            <Events />
          </div>
        </div>
      </div>
    </>
  )
}
