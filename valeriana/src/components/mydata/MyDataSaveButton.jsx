import React from 'react';
import { FilledButton } from '../globalComponents/buttons/FilledButton';
import { Loading } from '../globalComponents/loading/Loading';


export const MyDataSaveButton = ({ isLoading }) => {
  return (
    <div className='col-span-2'>
      <FilledButton>
        {isLoading ?
          <Loading /> :
          <input className='text-md cursor-pointer' value="Guardar" type="submit" />
        }
      </FilledButton>
    </div>
  )
}
