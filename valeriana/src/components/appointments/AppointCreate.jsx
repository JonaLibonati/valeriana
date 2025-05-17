import { useRef, useState } from 'react'
import { FilledButton } from '../globalComponents/buttons/FilledButton';
import { CreateMeeting } from './create/CreateMeeting';
import { PsychologistProvider } from '../../contexts/PsychologistContext';
import { ChevronDownIcon } from '../globalComponents/icons/ChevronDownIcon';
import { ChevronUpIcon } from '../globalComponents/icons/ChevronUpIcon';
import { PlusIcon } from '../globalComponents/icons/PlusIcon';

export const AppointCreate = () => {

  const createButton = useRef(null)

  const [create, setCreate] = useState(false);
  const [action, setAction] = useState(null);

  const handleClose = () => {
    setCreate(state => !state);
    setAction(null)
  }

  return (
    <PsychologistProvider>
      <div ref={createButton} className='mb-6 outline outline-primary-base rounded-md cursor-pointer'>
        <div className='h-[46px]' onClick={handleClose}>
          <FilledButton >
            <div className='flex'>
              <PlusIcon className={"h-full size-6"} />
              <div className='text-center flex-grow' >Crear</div>
              {create ? <ChevronDownIcon className={"h-full"} /> : <ChevronUpIcon className={"h-full"} />}
            </div>
          </FilledButton>
        </div>
        {create && action === null?
          <div>
            <div className='p-4 mt-2' onClick={() => setAction(0)}>Reunion</div>
          </div>
          : <></>
        }

        {create && action === 0?
          <div className='p-1'>
            <CreateMeeting />
          </div>
          : <></>
        }

      </div>
    </PsychologistProvider>
  )
}
