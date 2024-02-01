import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    inputTitle: '',
    inputDate: '',
    appList: [],
    starred: false,
  }

  onChangeTitleInput = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({inputDate: event.target.value})
  }

  changeToggleStar = givenId => {
    this.setState(prevState => ({
      appList: prevState.appList.map(eachApp => {
        if (eachApp.id === givenId) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      }),
    }))
  }

  renderListOfAppointments = () => {
    const {appList, starred} = this.state
    let filteredList
    if (starred) {
      filteredList = appList.filter(eachApp => eachApp.isStarred)
    } else {
      filteredList = appList
    }
    return filteredList.map(eachApp => (
      <AppointmentItem
        eachApp={eachApp}
        key={eachApp.id}
        changeToggleStar={this.changeToggleStar}
        starred={starred}
      />
    ))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {inputTitle, inputDate} = this.state
    const newAppointment = {
      inputTitle,
      inputDate,
      isStarred: false,
      id: uuidv4(),
    }

    this.setState(prevState => ({
      appList: [...prevState.appList, newAppointment],
      inputTitle: '',
      inputDate: '',
    }))
  }

  onToggleStarred = () => {
    this.setState(prevState => ({starred: !prevState.starred}))
  }

  render() {
    const {inputTitle, inputDate, starred} = this.state
    const starredClassName = starred ? 'violet-back' : ''
    return (
      <div className="main-container">
        <div className="content-container">
          <h1 className="main-heading">Add Appointments</h1>
          <div className="style-containers">
            <form className="style-form" onSubmit={this.onAddAppointment}>
              <div className="each-input-container">
                <label className="style-label" htmlFor="title">
                  TITLE
                </label>
                <input
                  className="style-input"
                  type="text"
                  id="title"
                  placeholder="Title"
                  onChange={this.onChangeTitleInput}
                  value={inputTitle}
                />
              </div>
              <div className="each-input-container">
                <label className="style-label" htmlFor="date">
                  DATE
                </label>
                <input
                  className="style-input"
                  type="date"
                  id="date"
                  placeholder="dd/mm/yyyy"
                  onChange={this.onChangeDateInput}
                  value={inputDate}
                />
              </div>
              <button className="addButton" type="submit">
                Add
              </button>
            </form>
            <img
              className="style-image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="style-line" />

          <div className="list-container">
            <h1 className="style-appointments-heading">Appointments</h1>
            <button
              className={`style-starred-button ${starredClassName}`}
              type="button"
              onClick={this.onToggleStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {this.renderListOfAppointments()}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
