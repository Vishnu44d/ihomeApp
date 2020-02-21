import React, { useState, Component } from 'react';
import { MDBIcon } from "mdbreact";
import {Dropdown} from 'reactstrap';
import auth from './../../_services/userService/auth';
import Spin from './../spinner/Spin';
import getMyDevices from './../../_services/deviceService/getAllDevice';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';

class NavBar extends Component{
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      btnDropleft: false,
      isOpenProfile: false,
      loading: false,
      logout: false,
      devices: getMyDevices()
    }
    this.toggle = this.toggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(){
    auth.logout(()=>{
      //this.context.history.push('/')
      this.setState({logout:true})
      this.props.history.push("/");
    })
    
    console.log("Logout ", this.state.logout)
    console.log("isAuth ", auth.isAuthenticated())
  }
  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render(){
    const isOpen = this.state.isOpen;
    const isOpenProfile = this.state.btnDropleft;
    const loading = this.state.loading;
    
    return (
      <div>
        <Navbar className="grey darken-3" light expand="md" style={{marginBottom: "50px"}}>
        <Link to="/"><NavbarBrand href="/" className="text-white">iHome</NavbarBrand></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar className="text-white">
            <Nav className="mr-auto" navbar>
              <NavItem>
              <Link to="/dashbord"><NavLink className="text-white">Dashboard</NavLink></Link>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap" className="text-white">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="text-white">
                  Devices
                </DropdownToggle>
                <DropdownMenu right className="text-white">
                  {
                    this.state.devices.map((item, index)=>{
                      return (
                        <DropdownItem key={index}>
                          <Link to={`/devices/${item.name}`}><span>{item.name}</span></Link>
                        </DropdownItem>

                      )
                    })
                  }
                  
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>
              {
                auth.isAuthenticated()?
                    <Dropdown direction="left" isOpen={isOpenProfile} toggle={() => { this.setState({ btnDropleft: !this.state.btnDropleft }); }}>
                    <DropdownToggle color="light" caret>
                      <MDBIcon icon="user-alt" />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>
                        <Button to="/" className="px-4 grey darken-3" disabled={loading} onClick={this.handleLogout}> 
                          {loading ?
                            <Spin size="sm" />
                            :
                            <span className="text-white">Logout</span>
                          }
                        </Button>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown> :
                  <p></p>

              }
              
              
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
    }
}


export default NavBar;