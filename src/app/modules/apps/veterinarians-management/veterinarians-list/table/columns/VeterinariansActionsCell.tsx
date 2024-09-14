
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {ID, KTIcon, QUERIES} from '../../../../../../../_metronic/helpers'
// import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {approveVet, archiveVet, declineVet, unarchiveVet} from '../../core/_requests'

type Props = {
  id: ID,
  status: string | undefined  
}

const VeterinariansActionsCell: FC<Props> = ({id, status}) => {
  // const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])


  const approveVeterinarian = useMutation(() => approveVet(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })
  const declineVeterinarian = useMutation(() => declineVet(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })
  const archiveVeterinarian = useMutation(() => archiveVet(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  const unarchiveVeterinarian = useMutation(() => unarchiveVet(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })



  return (
    <>
      {status !== 'declined' && (

      <a
        href='#'
        className='btn btn-light btn-active-light-primary btn-sm'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        Actions
        <KTIcon iconName='down' className='fs-5 m-0' />
      </a>
    )}

      {/* begin::Menu */}
    
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        {/* Conditionally render actions based on status */}
        {status === 'pending' && (
          <>
            <div className='menu-item px-3'>
              <a
                className='menu-link px-3'
                onClick={async () => await approveVeterinarian.mutateAsync()}
              >
                Approve
              </a>
            </div>
            <div className='menu-item px-3'>
              <a
                className='menu-link px-3'
                onClick={async () => await declineVeterinarian.mutateAsync()}
              >
                Decline
              </a>
            </div>
          </>
        )}

        {status === 'approved' && (
          <div className='menu-item px-3'>
            <a
              className='menu-link px-3'
                onClick={async () => await archiveVeterinarian.mutateAsync()}
            >
              Archive
            </a>
          </div>
        )}

        {status === 'archived' && (
          <div className='menu-item px-3'>
            <a
              className='menu-link px-3'
                onClick={async () => await unarchiveVeterinarian.mutateAsync()}
            >
              Unarchive
            </a>
          </div>
        )}

      </div>
      {/* end::Menu */}
    </>
  )
}

export {VeterinariansActionsCell}
