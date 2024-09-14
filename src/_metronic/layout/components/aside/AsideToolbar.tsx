import {useAuth} from '../../../../app/modules/auth'
import { backendProfiles, getUserImage } from '../../../helpers/ProfileHelper'

const AsideToolbar = () => {
  const {currentUser} = useAuth()

  const userImage = getUserImage(currentUser);

  return (
    <>
      {/*begin::User*/}
      <div className='aside-user d-flex align-items-sm-center justify-content-center py-5'>
        {/*begin::Symbol*/}
        <div className='symbol symbol-50px'>
          <img src={backendProfiles(userImage)} alt='' />
        </div>
        {/*end::Symbol*/}

        {/*begin::Wrapper*/}
        <div className='aside-user-info flex-row-fluid flex-wrap ms-5'>
          {/*begin::Section*/}
          <div className='d-flex'>
            {/*begin::Info*/}
            <div className='flex-grow-1 me-2'>
              {/*begin::Username*/}
              <a href='#' className='text-white text-hover-primary fs-6 fw-bold'>
                {currentUser?.user.name} 
              </a>
              {/*end::Username*/}

              {/*begin::Description*/}
              <span className='badge badge-light-success fw-bolder fs-8 mb-1'>Admin</span>
              {/* <span className='text-gray-600 fw-bold d-block fs-8 mb-1'>Admin</span> */}
              {/*end::Description*/}

              {/*begin::Label*/}
              {/* <div className='d-flex align-items-center text-success fs-9'>
                <span className='bullet bullet-dot bg-success me-1'></span>online
              </div> */}
              {/*end::Label*/}
            </div>
            {/*end::Info*/}
      
            {/*end::User menu*/}
          </div>
          {/*end::Section*/}
        </div>
        {/*end::Wrapper*/}
      </div>
      {/*end::User*/}

    </>
  )
}

export {AsideToolbar}
