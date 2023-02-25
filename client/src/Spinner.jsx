import { Loading } from '@nextui-org/react'
import React from 'react'

const Spinner = () => {
  return (
    <Loading
        loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}
      />
  )
}

export default Spinner