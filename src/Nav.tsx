import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const applyClassNames = ({ isActive } : { isActive: boolean }) => (
  classNames(
    'navbar-item',
    { 'has-background-grey-lighter': isActive },
  )
);

export const Nav = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          className={applyClassNames}
          to="/"
        >
          Dashboard
        </NavLink>

        <NavLink
          className={applyClassNames}
          to="/addBook"
        >
          Add a book
        </NavLink>

        {/* <NavLink
          className={applyClassNames}
          to="/editBook"
        >
          Edit a book
        </NavLink> */}
      </div>
    </div>
  </nav>
);
