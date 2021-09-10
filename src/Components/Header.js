import React from 'react';
import '../Styles/header.css';
import {withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import axios from 'axios';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: '2px solid brown',
      backgroundColor: 'white',          // we cant keep css - element so make letter capital or make a string
      boxShadow:' 10px 10px 5px grey'
    },
  };
class Header extends React.Component {
    
    constructor(){
        super();
        this.state={
            loginModalIsOpen:false,
            loggedInUserName:undefined,
            isLoggedIn : false,
            email: undefined,
            password: undefined,
            firstname:undefined,
            lastname:undefined,
            signupmodalisopen: false,
          
            
        }
    } 
    handleNavigate = () =>{
        this.props.history.push('/');
    }

    responseFacebook = (response) => {
        console.log(response);
      }
    
    responseGoogle = (response) => {
        localStorage.setItem('loggedInUserName',response.profileObj.name);
        this.setState({ loginModalIsOpen:false, isLoggedIn : true, loggedInUserName : response.profileObj.name})
    }

    handleLogin=()=>{
        this.setState({loginModalIsOpen:true})
    }
    handleLogout=()=>{
        this.setState({ isLoggedIn :false , loggedInUserName:undefined})
    }
    handleCloseModal1 = (state , value) =>{
        this.setState({ [state]: value});
    }
    
    handleSignUps = () => {
        const {email, password,firstname,lastname} = this.state;
        const reqObj = {
            firstname:firstname,
            lastname:lastname,
            email: email,
            password: password
          };
          axios({
            url: '/signup',
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            data: reqObj
          }).then(response=> {
            alert(response.data.message);
            this.setState({ signupmodalisopen: false,email:undefined,firstname:undefined,lastname:undefined,password:undefined});
            
          }).catch()
}
hanldeinputchange = (event, state) => {
    this.setState({ [state]: event.target.value });
}
handlesignupss = () => {
  this.setState({signupmodalisopen: true,loginModalIsOpen:false})
}


handleCloseModal = (state , value) =>{
    this.setState({ [state]: value});
}

handlelogins = () => {
    this.setState({ loginModalIsOpen: true, signupmodalisopen: false });
}
    render(){
        const { loginModalIsOpen , isLoggedIn ,signupmodalisopen, firstname,lastname ,email,password}= this.state;
        const loggedInUserName = localStorage.getItem('loggedInUserName');
        return(
            <div>
            <div className="header">
                <div className="header-e" onClick={this.handleNavigate}>
                    <b>e!</b>
                    </div>
                    {isLoggedIn ? <div style={{display:'inline'}}>
                        <span className="loggedInUserName">{loggedInUserName}</span>
                        <span className="header-login" onClick={this.handleLogout}>Logout</span>
                    </div>:
                <div className="header-login" onClick={this.handleLogin}>Login</div>}
                <div className="header-login" onClick={this.handlesignupss}>Create an Account</div>
            </div>
            <Modal
            isOpen={ loginModalIsOpen }
            style={ customStyles }
            >
                <div className="glyphicon glyphicon-remove-circle boot"onClick={() => this.handleCloseModal1('signupmodalisopen1', false)}></div>
                <div>
                <FacebookLogin
                    appId="2920302324903689"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.responseFacebook} />
                    <GoogleLogin
                    clientId="498867379549-0ohocthiv7o903k78p99mm9qn1mdthe1.apps.googleusercontent.com"
                    buttonText="Login with Gmail"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                 />
                </div>

            </Modal>
           
            <Modal
                    isOpen={signupmodalisopen}
                    style={customStyles}>
                    <div className="glyphicon glyphicon-remove-circle boot"onClick={() => this.handleCloseModal('signupmodalisopen', false)}></div>
                    <div className="wheading">SignUp</div>
                    
                    <label class="form-control1" style={{ color: "#192f60"}}>First Name</label>
                    <input type="text" class="form-control" placeholder="Enter Name" value={firstname} onChange={(event) => this.hanldeinputchange(event, 'firstname')} />

                    <label class="form-control1" style={{ color: "#192f60" }}>Last Name</label>
                    <input type="text" class="form-control" placeholder="Enter Name" value={lastname} onChange={(event) => this.hanldeinputchange(event, 'lastname')} />

                    <label class="form-control1" style={{ color: "#192f60" }}>Email address</label>
                    <input type="email" class="form-control" placeholder="Enter email" value={email} onChange={(event) => this.hanldeinputchange(event, 'email')} />
                    
                    <label class="form-control1" style={{ color: "#192f60" }}>Password</label>
                    <input type="password" class="form-control" placeholder="Enter password" value={password} onChange={(event) => this.hanldeinputchange(event, 'password')} />
                    
                    <div id="datains" style={{display: "block", color:"#192f60", marginTop: "5px",fontFamily:"mv boli"}}>Already have an acount?<b  onClick={this.handlelogins}>Login</b></div>
                    
                    <button type="button" style={{ color: "#192f60" ,fontFamily:"mv boli" }}  class="btn btn-primary; mbt" onClick={this.handleSignUps}>Submit</button>
                    
                </Modal>  
            </div>
        )
    }
}

export default withRouter(Header);