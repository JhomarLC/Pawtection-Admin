
import clsx from 'clsx'
import {FC} from 'react'
import {User} from '../../core/_models'

type Props = {
  user: User
}
const VET_PROFILE_PATH = "http://127.0.0.1:8000/storage/vet_profiles/";
const VeterinariansInfoCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
      <a href='#'>
        {user.image ? (
          <div className='symbol-label'>
            <img src={VET_PROFILE_PATH+user.image} alt={user.name} className='w-100' />
          </div>
        ) : (
          <div
            className={clsx(
              'symbol-label fs-3',
              `bg-light-${user.initials?.state}`,
              `text-${user.initials?.state}`
            )}
          >
            {user.initials?.label}
          </div>
        )}
      </a>
    </div>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {user.name}
      </a>
      <span>{user.email}</span>
    </div>
  </div>
)

export {VeterinariansInfoCell}
