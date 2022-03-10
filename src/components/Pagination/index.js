import {
    AiOutlineLeft,
    AiOutlineRight,
  } from 'react-icons/ai'
  import {
    NavigateButtons,
    PrevNavigateButton,
    ForwardNavigateButton,
  } from './styling'
  
  import './index.css'
  
  const Pagination = props => {
    const {users, totalPagesCount, navigateToPages} = props
    const usersListPerPage = 10
    const totalAdminUsers = users.length
    const totalPages = []
    for (let i = 1; i <= Math.round(totalAdminUsers / usersListPerPage); i += 1) {
      totalPages.push(i)
    }
    const pagesLimit = totalPages.slice(-1)
  
    const onClickToPage = event => {
      navigateToPages(event.target.value)
    }
  
    const onClickPreviousPage = () => {
      if (totalPagesCount > 0) {
        navigateToPages(totalPagesCount)
      }
    }
  
    const onClickForwardPage = () => {
      if (pagesLimit > totalPagesCount + 1) {
        navigateToPages(totalPagesCount + 2)
      }
    }
  
 
    const onClickDeleteSelectedUsers = () => {
      const {deleteSelectedUsers} = props
      deleteSelectedUsers()
    }
  
    return (
      <div className="pagination-container">
        <button
          className="delete-button"
          type="button"
          onClick={onClickDeleteSelectedUsers}
        >
          Delete Selected
        </button>
        <ul className="pagination-controls">
   
          <li key="left">
            <PrevNavigateButton
              isDisabled={totalPagesCount !== 0}
              type="button"
              onClick={onClickPreviousPage}
              className="previous-page-button"
            >
              <AiOutlineLeft />
            </PrevNavigateButton>
          </li>
          {totalPages.map(eachPage => (
            <li key={eachPage}>
              <NavigateButtons
                isActive={totalPagesCount === eachPage - 1}
                className="navigation-button"
                value={eachPage}
                type="button"
                onClick={onClickToPage}
              >
                {eachPage}
              </NavigateButtons>
            </li>
          ))}
          <li key="right">
            <ForwardNavigateButton
              isDisabled={totalPagesCount !== pagesLimit - 1}
              type="button"
              onClick={onClickForwardPage}
              className="forward-page-button"
            >
              <AiOutlineRight />
            </ForwardNavigateButton>
          </li>
      
        </ul>
      </div>
    )
  }
  
  export default Pagination
  