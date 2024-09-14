import {FC} from 'react'

type Props = {
  position?: string
}

const VeterinariansPosition: FC<Props> = ({position}) => (
  <div className='badge badge-light fw-bolder'>{position}</div>
)

export {VeterinariansPosition}
