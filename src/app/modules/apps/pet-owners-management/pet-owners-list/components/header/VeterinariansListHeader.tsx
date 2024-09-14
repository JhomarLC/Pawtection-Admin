import {useListView} from '../../core/ListViewProvider'
import {VeterinariansListToolbar} from './VeterinariansListToolbar'
import {VeterinariansListGrouping} from './VeterinariansListGrouping'
import {VeterinariansListSearchComponent} from './VeterinariansListSearchComponent'

const VeterinariansListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <VeterinariansListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <VeterinariansListGrouping /> : <VeterinariansListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {VeterinariansListHeader}
