import { Box } from '@mui/material'
import React from 'react'

export default function Layout({children}) {
  return (
    <Box sx={{display:"flex", flexDirection:'column', alignItems:'center', justifyContent:'center', mx:'3rem'}}>
        {children}
    </Box>
  )
}
