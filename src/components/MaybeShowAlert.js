import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'

const MaybeShowAlert = ({children}) => {
    const location = useLocation();
    const [ShowAlert, setShowAlert] = useState(false)

    useEffect(()=>{
        if(location.pathname === '/BookingForm' || location.pathname === '/Signup' || location.pathname === '/'){
            setShowAlert(true)
        }
        else{
            setShowAlert(false)
        }
    },[location])

  return (
    <div>
      { ShowAlert && children}
    </div>
  )
}

export default MaybeShowAlert
