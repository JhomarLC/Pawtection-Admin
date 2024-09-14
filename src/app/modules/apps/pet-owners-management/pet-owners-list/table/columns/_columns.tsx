import {Column} from 'react-table'
import {VeterinariansInfoCell} from './VeterinariansInfoCell'
import {VeterinariansLastLoginCell} from './VeterinariansLastLoginCell'
import {VeterinariansTwoStepsCell} from './VeterinariansTwoStepsCell'
import {VeterinariansActionsCell} from './VeterinariansActionsCell'
import {VeterinariansSelectionCell} from './VeterinariansSelectionCell'
import {VeterinariansCustomHeader} from './VeterinariansCustomHeader'
import {VeterinariansSelectionHeader} from './VeterinariansSelectionHeader'
import {User} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <VeterinariansSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <VeterinariansSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <VeterinariansCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <VeterinariansInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <VeterinariansCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
    accessor: 'role',
  },
  {
    Header: (props) => (
      <VeterinariansCustomHeader tableProps={props} title='Last login' className='min-w-125px' />
    ),
    id: 'last_login',
    Cell: ({...props}) => <VeterinariansLastLoginCell last_login={props.data[props.row.index].last_login} />,
  },
  {
    Header: (props) => (
      <VeterinariansCustomHeader tableProps={props} title='Two steps' className='min-w-125px' />
    ),
    id: 'two_steps',
    Cell: ({...props}) => <VeterinariansTwoStepsCell two_steps={props.data[props.row.index].two_steps} />,
  },
  {
    Header: (props) => (
      <VeterinariansCustomHeader tableProps={props} title='Joined day' className='min-w-125px' />
    ),
    accessor: 'joined_day',
  },
  {
    Header: (props) => (
      <VeterinariansCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <VeterinariansActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
