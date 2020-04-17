import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'; 
import { addContactUser } from '../../store/actions/ContactAction'

class AddContact extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			email : '',
			firstname : '',
			lastname : '',
			profile_image : '',
			phonenumber: '',
		}
	}
	
	handleChange = (e) => {
		this.setState({
			[e.target.id] : e.target.value
		})
	}
	
	//This converts a blob type image to base64 encoded string
	getBase64 = (file,callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(file);
	}
	
	fileTransform = (e) => {
		this.getBase64(e.target.files[0],(base64String) => {
			this.state.profile_image = base64String;
			console.log(this.state)
		})
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
		this.props.addContactUser(this.state);
	}
	
    render() {
		const {contactResponse} = this.props;
        return (
            <div>
                <h1>Add a new Contact</h1>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
				<b>{contactResponse != null ? contactResponse : null}</b><br/>
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
						type = "email"
						onChange = {this.handleChange}
					/><br/>
					<TextField 
						id = "phonenumber"
						label = "Phone"
						style={{ margin:8,maxWidth:500}}
						placeholder = "Enter your phone number"
						fullWidth
						margin = "normal"
						variant = "outlined"
						type = "number"
						required
						onChange = {this.handleChange}
					/><br/><br/>
					<input type="file" id="file_input" onChange={this.fileTransform} />
					<br/><br/>
					<Button variant="contained" type="submit" style={{width:500}} color="primary">
						Add A Contact
					</Button>
				</form>
            </div>
        );
    }
}

const mapDisPatchToProps = (dispatch) => {
    return {
        addContactUser:(creds) => dispatch(addContactUser(creds))
    }
}

const mapStateToProps = (state) => {
    return {
		contactResponse:state.contact.contactResponse
    }
}

export default connect(mapStateToProps,mapDisPatchToProps)(AddContact);