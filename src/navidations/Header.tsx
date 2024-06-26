import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Modal from '../UI/Modal'
import Button from '../UI/Button'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { removeSession } from '../store/upcoming_sessions/upcoming-sessions-slice'


export default function Header() {
  const handleModal = useRef<HTMLDialogElement>(null)
  const selector = useSelector((state: RootState) => state.upcomingSessions.items)
  const dispatch = useDispatch()
  const [toggleIcon, setToggleIcon] = useState(false)

  const handleToggle = () => {
    setToggleIcon(!toggleIcon)
  }

  const handleClose = () => {
    setToggleIcon(false)
  }

  return (
    <main id='main-header'>
      <Modal ref={handleModal}>
        <h1>Upcoming Sessions</h1>
        {selector.length === 0 && <p>No upcoming sessions</p>}
        <ul>
          {selector?.map(item => (
            <li key={item.id}>
              <article className='upcoming-session'>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <time>{item.date}</time>
                </div>
                <p className='actions'>
                  <Button textOnly onClick={() => dispatch(removeSession(item.id))} >Cancel</Button>
                </p>
              </article>
            </li>
          ))}
        </ul>
        <Button onClick={() => handleModal.current!.close()}>close</Button>
      </Modal>
      <h1>React Mentoring</h1>
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to="/react-mentoring-finish-project/" className={({ isActive }) => isActive ? 'active' : ''} end >Our Mission</NavLink>
          </li>
          <li>
            <NavLink to="/react-mentoring-finish-project/sessions" className={({ isActive }) => isActive ? 'active' : ''}>Brouse Session</NavLink>
          </li>
          <li>
            <Button className='button' onClick={() => handleModal.current?.showModal()}>Upcoming Sessions</Button>
          </li>
        </ul>
      </nav>
      <nav id="hamburger-nav">
        <div className="hamburger-menu">
          <div className={toggleIcon ? 'hamburger-icon open' : "hamburger-icon"} onClick={handleToggle}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={toggleIcon ? 'menu-links open' : 'menu-links'}>
            <li>
              <NavLink to="/react-mentoring-finish-project/" onClick={handleClose} className={({ isActive }) => isActive ? 'active' : ''} end >Our Mission</NavLink>
            </li>
            <li>
              <NavLink to="/react-mentoring-finish-project/sessions" onClick={handleClose} className={({ isActive }) => isActive ? 'active' : ''}>Brouse Session</NavLink>
            </li>
            <li>
              <Button className='button' onClick={() => handleModal.current?.showModal() && handleClose()}>Upcoming Sessions</Button>
            </li>
          </div>
        </div>
      </nav>
    </main>
  )
}
