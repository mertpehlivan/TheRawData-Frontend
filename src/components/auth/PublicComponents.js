import React from 'react'
import { Outlet } from 'react-router-dom'

export const PublicComponents = () => {
    console.log("PublicComponents")
  return (
    <Outlet/>
  )
}
