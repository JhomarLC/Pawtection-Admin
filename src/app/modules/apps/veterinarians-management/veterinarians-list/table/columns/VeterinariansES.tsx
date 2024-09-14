import {FC} from 'react'

type Props = {
  electronic_signature?: string
}

const VET_ES_PATH = "http://127.0.0.1:8000/storage/electronic_signatures/";
const VeterinariansES: FC<Props> = ({electronic_signature}) => (
  <div className='symbol symbol-50px' style={{ backgroundColor: 'white' }}>
    <img src={VET_ES_PATH+electronic_signature} alt='' />
  </div>
)

export {VeterinariansES}
