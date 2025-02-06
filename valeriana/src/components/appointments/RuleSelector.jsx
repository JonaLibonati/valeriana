import React, {useState} from 'react'
import { FilledButton } from '../globalComponents/buttons/FilledButton';
import { GoBackButton } from "../globalComponents/buttons/GoBackButton";
import { CreateMeeting } from './rules/CreateMeeting';

export const RuleSelector = () => {
  const [action, setAction] = useState(null);

  return (
    <>
      
      {action == 0? 
      <>
        <GoBackButton handleClick={() => setAction(null)} />
        <CreateMeeting />
      </> : action == 1?
      <>
        <GoBackButton handleClick={() => setAction(null)} />
        <CreateMeeting />
      </> :
      <>
        <div>
          <FilledButton >
            <div className='text-center' onClick={() => setAction(0)}>Nueva reunión</div>
          </FilledButton>
          <FilledButton>
            <div className='text-center' onClick={() => setAction(1)}>Nueva restricción</div>
          </FilledButton>
        </div>
      </>
      }
    </>
  )
}
