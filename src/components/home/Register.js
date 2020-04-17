import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { signUp,resetAuthResponsePerComponent } from '../../store/actions/AuthAction'

class Register extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			email : '',
			firstname : '',
			lastname : '',
			password : ''
		}
	}
	
	componentDidMount = () => {
		this.props.resetAuthResponsePerComponent();
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		console.log("submit button has been clicked");
		console.log(this.state);
		this.props.signUp(this.state);
	}
	
	handleChange = (e) => {
		this.setState({
			[e.target.id] : e.target.value
		})
	}
	
    render() {
		const {authResponse} = this.props;
        return (
			<div>
				<h1>Please Register Account</h1>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
				<b>{authResponse != null && authResponse !="" ? authResponse : null}</b><br/>
					<TextField 
						id = "firstname"
						label = "Firstname"
						style={{ margin:8,maxWidth:500}}
						placeholder = "Enter your Firstname"
						fullWidth
						margin = "normal"
						variant = "outlined"
						required
						onChange = {this.handleChange}
					/><br/>
					<TextField 
						id = "lastname"
						label = "Lastname"
						style={{ margin:8,maxWidth:500}}
						placeholder = "Enter your Lastname"
						fullWidth
						margin = "normal"
						variant = "outlined"
						required
						onChange = {this.handleChange}
					/><br/>
					<TextField 
						id = "email"
						label = "Email Address"
						style={{ margin:8,maxWidth:500}}
						placeholder = "Enter your Email"
						fullWidth
						margin = "normal"
						variant = "outlined"
						required 
						type = "email"
						onChange = {this.handleChange}
					/><br/>
					<TextField 
						id = "password"
						label = "Password"
						style={{ margin:8,maxWidth:500}}
						placeholder = "Enter your Password"
						fullWidth
						margin = "normal"
						variant = "outlined"
						type = "password"
						required
						onChange = {this.handleChange}
					/><br/>
					<Button variant="contained" type="submit" style={{width:500}} color="primary">
						Register
					</Button>
				</form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		authResponse : state.auth.authResponse
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signUp : (creds) => dispatch(signUp(creds)),
		resetAuthResponsePerComponent:() => dispatch(resetAuthResponsePerComponent())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Register)