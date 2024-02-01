import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {eachApp, changeToggleStar} = props
  const {id, inputTitle, inputDate, isStarred} = eachApp
  const toggleStar = () => {
    changeToggleStar(id)
  }

  const starUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const newDate = format(new Date(inputDate), 'dd MMMM yyyy, EEEE')

  return (
    <li className="style-each-appointment">
      <div>
        <p className="style-title">{inputTitle}</p>
        <p className="style-para">Date: {newDate}</p>
      </div>
      <button
        className="style-star-button"
        type="button"
        data-testid="star"
        onClick={toggleStar}
      >
        <img className="style-star-image" src={starUrl} alt="star" />
      </button>
    </li>
  )
}
export default AppointmentItem
