import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'

const DashboardPage = () => (
  <>
    <h1>Hello World!</h1>
  </>
)

const DashboardWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
