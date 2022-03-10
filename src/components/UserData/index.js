import {Component} from 'react'
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'
import './index.css'

class UserData extends Component {
  state = {
    editUserName: '',
    editUserEmail: '',
    editUserRole: '',
    editAction: false,
  }

  onClickDeleteIcon = () => {
    const {deleteUserDetails, users} = this.props
    const {id} = users
    deleteUserDetails(id)
  }

  saveEditedUser = () => {
    const {editUserName, editUserEmail, editUserRole} = this.state
    const {users, updateUserDetails} = this.props
    const {id} = users
    const editedUser = {
      id,
      name: editUserName,
      email: editUserEmail,
      role: editUserRole,
    }

    updateUserDetails(editedUser)
    this.setState({
      editAction: false,
    })
  }

  onChangeUserEmail = event => {
    this.setState({
      editUserEmail: event.target.value,
    })
  }


  onChangeUserRole = event => {
    this.setState({
      editUserRole: event.target.value,
    })
  }


  onChangeUserName = event => {
    this.setState({
      editUserName: event.target.value,
    })
  }

  toggleCheckbox = () => {
    const {users,onChangeUserCheckbox} = this.props
    const {id} = users
    onChangeUserCheckbox(id)
  }


  onClickEditUserIcon = () => {
    const {users} = this.props
    console.log(users)
    const {name, email, role} = users
    this.setState(prevState => ({
      editUserName: name,
      editUserEmail: email,
      editUserRole: role,
      editAction: !prevState.editAction,
    }))
  }


  render() {
    const {editAction, editUserEmail,editUserName, editUserRole} = this.state
    const {users} = this.props
    const {name, email, role, isChecked} = users

    return (
      <li className="user-item-list">
        {editAction ? (
          <div className="editor-container">
            <input
              className="name-input"
              value={editUserName}
              onChange={this.onChangeUserName}
              type="text"
              placeholder="usernam"
            />
            <input
              type="text"
              className="email-input"
              value={editUserEmail}
              onChange={this.onChangeUserEmail}
              placeholder="email"
            />
            <input
              type="text"
              className="role-input"
              onChange={this.onChangeUserRole}
              placeholder="role"
              value={editUserRole}
              
            />
            <button
              className="save-button"
              type="button"
              onClick={this.saveEditedUser}
            >
              SAVE
            </button>
          </div>
        ) : (
          <>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={this.toggleCheckbox}
              className="checkbox"
            />
            <p className="user-info">{name}</p>
            <p className="user-info">{email}</p>
            <p className="user-info">{role}</p>
            <div className="actionsContainer">
              <FiEdit className="edit-icon" onClick={this.onClickEditUserIcon} />
              <AiOutlineDelete
                className="delete-icon"
                onClick={this.onClickDeleteIcon}
              />
            </div>
          </>
        )}
      </li>
    )
  }
}
export default UserData
