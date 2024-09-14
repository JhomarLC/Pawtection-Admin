import {FC} from 'react'

type Props = {
  phone_number?: string
}

const VeterinariansPhoneNumber: FC<Props> = ({phone_number}) => (
  <div className='badge badge-light fw-bolder'>{phone_number}</div>
)

export {VeterinariansPhoneNumber}
