import {Component} from 'react'
import {TailSpin} from 'react-loader-spinner'
import Pagination from '../Pagination'
import UserData from '../UserData'

import './index.css'

const requestStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILED',
}

class AdminUi extends Component {
  state = {
    users: [],
    requestStatus: 'LOADING',
    totalPagesCount: 0,
    selectAllUsersDetails: false,
    userSearchInput: '',
  }

  componentDidMount = () => {
    this.getAdminUsersData()
  }

  getAdminUsersData = async () => {
    this.setState({
      requestStatus: 'LOADING',
    })


    const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    )

    if (response.ok === true) {
      const fetchedUsersData = await response.json()
      const updatedUsersData = fetchedUsersData.map(eachUserDetails => ({
        ...eachUserDetails,
        isChecked: false,
      }))
      this.setState({
        users: updatedUsersData,
        requestStatus: 'SUCCESS',
      })
    } else {
      this.setState({
        requestStatus: 'FAILED',
      })
    }
  }

  navigateToPage = pageNum => {
    this.setState({
      totalPagesCount: pageNum - 1,
    })
  }



  deleteSelectedUsers = () => {
    const {users} = this.state
    const checkedUsersIds = this.getCheckedUsers(users)
    const updatedUsersData = users.filter(
      eachUserDetails => !checkedUsersIds.includes(eachUserDetails.id),
    )
    this.setState({
      users: updatedUsersData,
      selectAllUsersDetails: false,
    })
  }

  getCheckedUsers = users => {
    const checkedUsers = users.map(user => {
      if (user.isChecked === true) {
        return user.id
      }
      return null
    })
    return checkedUsers
  }

  onClickDeleteUserData = id => {
    const {users} = this.state
    const remainUsers = users.filter(eachUserDetails => eachUserDetails.id !== id)
    this.setState({
      users: remainUsers,
    })
  }


  onChangeUserCheckbox = id => {
    const {users} = this.state
    const updatedUsersData = users.map(eachUserDetails => {
      if (eachUserDetails.id === id) {
        const UpdatedMemberData = {
          ...eachUserDetails,
          isChecked: !eachUserDetails.isChecked,
        }
        return UpdatedMemberData
      }
      return eachUserDetails
    })
    this.setState({
      users: updatedUsersData,
    })
  }

  updateUserDetails = userData => {
    const {users} = this.state
    const updatedUsersDataData = users.map(eachUserDetails => {
      if (eachUserDetails.id === userData.id) {
        return userData
      }
      return eachUserDetails
    })
    this.setState({
      users: updatedUsersDataData,
    })
  }


  userInputValue = event => {
    this.setState({
      userSearchInput: event.target.value,
      totalPagesCount: 0,
    })
  }



  toggleAllCheckboxes = () => {
    const {selectAllUsersDetails, users} = this.state
    this.setState({
      selectAllUsersDetails: !selectAllUsersDetails,
    })

    const userSearchResult = this.getUserSearchResultsData(users)
    const currentPageUsersDetails = this.getCurrentPageUsersDetails(userSearchResult)
    const currentPageUsersDetailsIds = currentPageUsersDetails.map(eachUserDetails => eachUserDetails.id)
    if (selectAllUsersDetails === false) {
      const updatedUsersData = users.map(eachUserDetails => {
        if (currentPageUsersDetailsIds.includes(eachUserDetails.id)) {
          return {...eachUserDetails, isChecked: true}
        }
        return eachUserDetails
      })
      this.setState({
        users: updatedUsersData,
      })
    } else {
      const updatedUsersData = users.map(eachUserDetails => ({
        ...eachUserDetails,
        isChecked: false,
      }))
      this.setState({
        users: updatedUsersData,
      })
    }
  }



  getUserSearchResultsData = () => {
    const {users,userSearchInput} = this.state
    const userSearchResult = users.filter(
      eachUserDetails =>
        eachUserDetails.name.toLowerCase().startsWith(userSearchInput.toLowerCase()) ||
        eachUserDetails.email
          .toLowerCase()
          .startsWith(userSearchInput.toLowerCase()) ||
        eachUserDetails.role.toLowerCase().startsWith(userSearchInput.toLowerCase()),
    )
    return userSearchResult
  }

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <TailSpin height={45} width={50} />
    </div>
  )


  getCurrentPageUsersDetails = userSearchResult => {
    const {totalPagesCount} = this.state
    const maxUsersPerPage = 10
    const searchResultsLength = userSearchResult.length
    const previousPagesUsers = totalPagesCount * maxUsersPerPage
    const remainUsers = searchResultsLength - previousPagesUsers
    let presentPageUsers = []
    if (remainUsers <= maxUsersPerPage) {
      presentPageUsers = userSearchResult.slice(previousPagesUsers)
    } else {
      presentPageUsers = userSearchResult.slice(
        previousPagesUsers,
        previousPagesUsers + maxUsersPerPage,
      )
    }
    return presentPageUsers
  }


  successView = () => {
    const {users, selectAllUsersDetails,totalPagesCount, userSearchInput} = this.state
    const userSearchResult = this.getUserSearchResultsData()
    const currentPageUsersDetails = this.getCurrentPageUsersDetails(userSearchResult)

    return (
      <>
        <input
          type="search"
          onChange={this.userInputValue}
          placeholder="Search by user Details"
          value={userSearchInput}
          className="user-input"
        />
        {currentPageUsersDetails.length === 0 ? (
          <div className='not-found-container'>
            <img
        src="https://cdn2.iconfinder.com/data/icons/delivery-and-logistic/64/Not_found_the_recipient-no_found-person-user-search-searching-4-512.png"
          className="not-found-image"
              alt="no users found"
            />
            <p className='not-found-details'>User Data Not Found</p>
          </div>
        ) : (
          <ul className="users-list-data">
            <li className="list-nav">
              <div className='allCheck'>
              <input
                onChange={this.toggleAllCheckboxes}
                type="checkbox"
                checked={selectAllUsersDetails}
                className="nav-checkbox"
              />
              <p className='all'>All</p>
              </div>
              <h1 className="nav-name">Name</h1>
              <h1 className="nav-email">Email</h1>
              <h1 className="nav-role">Role</h1>
              <div className='actions-container'>
              <h1 className="nav-actions">Actions</h1>
              <div className='action-details'>
                <p className='text'>(Edit, Delete)</p>
                </div>
              </div>
            </li>
            {currentPageUsersDetails.map(eachUserDetails => (
              <UserData
              key={eachUserDetails.id}
                users={eachUserDetails}
                onChangeUserCheckbox={this.onChangeUserCheckbox}
                updateUserDetails={this.updateUserDetails}
                deleteUserDetails={this.onClickDeleteUserData}
              />
            ))}
          </ul>
        )}

        <Pagination
          users={users}
          navigateToPages={this.navigateToPage}
          deleteSelectedUsers={this.deleteSelectedUsers}
          totalPagesCount={totalPagesCount}
        />
      </>
    )
  }



  renderUserDataPage = () => {
    const {requestStatus} = this.state
    switch (requestStatus) {
      case requestStatusConstants.loading:
        return this.loadingView()

      case requestStatusConstants.success:
        return this.successView()

      case requestStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="user-details">{this.renderUserDataPage()}</div>
      </div>
    )
  }
}

export default AdminUi
