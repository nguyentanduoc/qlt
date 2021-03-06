import React, {Component} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import PropTypes from 'prop-types';

import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/img/brand/medicine-box-icon.png'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const {children, ...attributes} = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand
          full={{src: logo, width: '20%', alt: 'QLCHT Logo'}}
          minimized={{src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo'}}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg"/>
        <Nav className="ml-auto" navbar>
          {/*<NavItem className="d-md-down-none">*/}
          {/*  <NavLink href="#"><i className="icon-bell"/><Badge pill color="danger">5</Badge></NavLink>*/}
          {/*</NavItem>*/}
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/ntd-avatar.jpg'} className="img-avatar" alt="ntduoc@gmail.com"/>
            </DropdownToggle>
            <DropdownMenu right style={{right: 'auto'}}>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"/> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-md-down-none"/>*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
