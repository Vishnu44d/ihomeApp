import React, { Component } from 'react';
import { MDBIcon } from "mdbreact";
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Spin from './../spinner/Spin';
import auth from './../../_services/userService/auth';
import userService from './../../_services/userService/user';
import Toast from './../toast/Toast';

import { connect } from 'react-redux';
import {setToken} from './../../actions';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      submitted: false,
      error: '',
      loading: false,
      isSuccess: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }


  handleLogin(e) {
    e.preventDefault();
    console.log(this.state)
    const { username, password } = this.state;
    if (!(username && password)) {
        return;
    }

    this.setState({ loading: true });
    userService.login(username, password)
      .then(
        user => {
            if(user.status === 'fail')
                this.setState({ error: user.message, loading: false, isSuccess:false });
            else{
                this.props.setToken(user.token);
                this.setState({isSuccess:true});
                auth.login(() => {
                    this.props.history.push("/dashbord/");
                });
            }
        },
    );
    
    console.log(this.state.error);
    this.setState({isSuccess:true})
  }
  render() {
    const { username, password, submitted, loading, error } = this.state;
    return (
      <div style={{minHeight: "1vh", height:"100%"}}>
      <div className="app flex-row align-items-center align-middle justify-content-center">
        <Container className="justify-content-center">
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <MDBIcon icon="user-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" name="username" value={username} onChange={this.handleChange}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <MDBIcon icon="key" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" name="password" value={password} onChange={this.handleChange}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button className="px-4 grey darken-3" disabled={loading} onClick={this.handleLogin}>
                            
                            {loading ?
                              <Spin size="sm" />
                              :
                              "Login"
                            }
                            
                          
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white grey darken-3 py-5 d-md-down-none">
                  <CardBody className="text-center">
                    <div>
                      <h2>Welcome to ihome</h2>
                      <p>Get in touch with the creator of the app to get your admin id and password</p>
                      
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
        {
          this.state.isSuccess===true?<div></div>:
          <Toast msg={error}/>
        }
        
      </div>
      </div>
    );
  }
}


const mapStateToProps = ({isLoggedIn, token }) => ({
  isLoggedIn,
  token
})

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(setToken(token))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);