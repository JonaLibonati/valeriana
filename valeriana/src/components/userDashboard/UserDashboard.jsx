import React, { useEffect } from 'react';
import { SelfUser } from '../../api/selfUser';

export const UserDashboard = () => {

  useEffect( () => {

    SelfUser.getAll()
    .then(({res, body}) => {
      console.log(res)
      console.log(body)
    })
    .catch(console.error)

  }, [])


  return (
    <>
      <div>userDashboard</div>
      <button onClick={async() => await SelfUser.logout()}>LOG OUT</button>
    </>
  )
}

