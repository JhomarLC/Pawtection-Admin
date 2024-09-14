import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {VeterinariansListHeader} from './components/header/VeterinariansListHeader'
import {VeterinariansTable} from './table/VeterinariansTable'
import {VeterinariansEditModal} from './user-edit-modal/VeterinariansEditModal'
import {KTCard} from '../../../../../_metronic/helpers'

const UsersList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <VeterinariansListHeader />
        <VeterinariansTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <VeterinariansEditModal />}
    </>
  )
}

const VeterinariansListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {VeterinariansListWrapper}
