import {useQuery} from 'react-query'
import {VeterinariansEditModalForm} from './VeterinariansEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getUserById} from '../core/_requests'

const VeterinariansEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: user,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getUserById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )

  if (!itemIdForUpdate) {
    return <VeterinariansEditModalForm isUserLoading={isLoading} user={{id: undefined}} />
  }

  if (!isLoading && !error && user) {
    return <VeterinariansEditModalForm isUserLoading={isLoading} user={user} />
  }

  return null
}

export {VeterinariansEditModalFormWrapper}
