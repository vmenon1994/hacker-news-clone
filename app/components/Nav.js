import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const activeStyles = {
  color: 'rgb(187,46,31)',
}

export default class Nav extends React.Component {

  static propTypes = {
    mode: PropTypes.string.isRequired,
    toggleSiteTheme: PropTypes.func.isRequired
  }

  render() {
    const {mode, toggleSiteTheme} = this.props
    console.log(mode)
    return (
      <header className='top-bar'>
        <nav>
          <ul className="nav-menu">
            <li>
              <NavLink
                exact
                to="/"
                className={`nav-item-${mode}`}
                activeStyle={activeStyles}>
                Top
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/new"
                className={`nav-item-${mode}`}
                activeStyle={activeStyles}>
                New
              </NavLink>
            </li>
          </ul>
        </nav>
      <ul>
        <li onClick={()=>toggleSiteTheme()} className="theme-button">
          {mode === 'dark' ? '💡' : '🔦'}
        </li>
      </ul>
      </header>
    )
  }
}
