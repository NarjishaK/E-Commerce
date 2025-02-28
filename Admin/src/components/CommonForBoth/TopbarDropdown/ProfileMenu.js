import React, { useState } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import {  Link } from "react-router-dom";
import withRouter from "components/Common/withRouter"

// users

const ProfileMenu = props => {
  const [menu, setMenu] = useState(false)

   const admin=JSON.parse(localStorage.getItem("adminDetails"))
  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={admin.image}
            alt="Header Avatar"
          />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag={Link} to={`/profile/${admin.id}`}>
            {" "}
            <i className="mdi mdi-account-circle font-size-17 text-muted align-middle me-1"/>
            {props.t("Profile")}{" "}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="#">
            <i className="mdi mdi-wallet font-size-17 text-muted align-middle me-1"/>
            {props.t("My Wallet")}
          </DropdownItem> */}
          {/* <DropdownItem className="d-flex align-items-center" to="#">
            <i className="mdi mdi-cog font-size-17 text-muted align-middle me-1"></i>
            {props.t("Settings")}<span className="badge bg-success ms-auto">11</span></DropdownItem> */}
          <DropdownItem tag="a" href={`/auth-lock-screen/${admin.id}`}>
            <i className="mdi mdi-lock-open-outline font-size-17 text-muted align-middle me-1"/>
            {props.t("Lock screen")}
          </DropdownItem>
          
          <div className="dropdown-divider"/>
          <Link to="/logout" className="dropdown-item text-danger">
            <i className="mdi mdi-power font-size-17 text-muted align-middle me-1 text-danger"/>
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)