import React from 'react'

function Signout() {
    function signout(){
        window.localStorage.clear()
        window.location.href="/";
    }
  return (
    <div onLoad={signout()}></div>
  )
}

export default Signout;