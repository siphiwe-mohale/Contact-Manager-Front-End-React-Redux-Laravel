import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Pagination from 'rc-pagination'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete'; 
import SaveIcon from '@material-ui/icons/Save';
import {loadContactUser, loadSearchContactUser, deleteContactUser} from '../../store/actions/ContactAction';
import { connect } from 'react-redux';

class ViewContact extends Component {
	
	 constructor(props)
    {
        super(props)
        this.state = {
          search_content:""
        }
    }

   componentDidMount = () =>{
     const page = "";
     this.props.loadContactUser(page);
   }

    handleKeyUp = async (e) =>{
      await  this.setState({
          [e.target.id] :e.target.value
        })
        console.log(this.state)
      if(this.state.search_content==""){

      }else{
        let page ="";
        this.props.loadSearchContactUser(this.state.search_content,page);
      }
    }

     onChange = (currentPage) =>{
       if(this.state.search_content==""){
        this.props.loadContactUser(currentPage)
       }else {
         this.props.loadSearchContactUser(this.state.search_content,currentPage)
       }
      
      }

      loadEditpage = (e,id)=>
      {
        this.props.history.push('/dashboard/edit-contact/'+id);
      }

      DeleteContact = (e,id) =>
      {
        const confirmDialog  = window.confirm("Are you sure you want to delete this contact?");
        if(confirmDialog==true)
        {
          this.props.deleteContactUser(id);
        }else{

        }
      }

	
    render() {
		
		const {loadContacts} = this.props;
		
        return (
            <div>
				<TextField 
						id = "search_content"
						label = "search"
						style={{ margin:8,maxWidth:500}}
						placeholder = "Search with Firstname"
						fullWidth
						margin = "normal"
						onKeyUp={this.handleKeyUp}
				/>
                <TableContainer >
				  <Table aria-label="simple table">
					<TableHead>
					  <TableRow>
						<TableCell align="left">Firstname</TableCell>
						<TableCell align="left">Lastname</TableCell>
						<TableCell align="left">Email </TableCell>
						<TableCell align="left">Phone Number</TableCell>
						<TableCell align="left">Profile Image</TableCell>
						<TableCell align="left" >Edit</TableCell>
						<TableCell align="left" >Delete</TableCell>
					  </TableRow>
					</TableHead>
					<TableBody>
					  {loadContacts && loadContacts.hasOwnProperty('data')? loadContacts.data.data.map(row => (
						<TableRow key={row.id}>
						  <TableCell align="left">{row.firstname}</TableCell>
						  <TableCell align="left">{row.lastname}</TableCell>
						  <TableCell align="left">{row.email}</TableCell>
						  <TableCell align="left">{row.phonenumber}</TableCell>
						  <TableCell align="left">
							<img src={loadContacts.file_directory+"/"+row.image_file} width={50} height={50}/>
						  </TableCell>
						  <TableCell align="left">
						  <Button variant="contained" color="primary" startIcon={<SaveIcon />} id={row.id} onClick={(e)=>this.loadEditpage(e,row.id)}>
							Edit
						  </Button>
						  </TableCell>
						  <TableCell align="left">
						  <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} id={row.id} onClick={(e)=>this.DeleteContact(e,row.id)}>
							Delete
						  </Button>
						  </TableCell>
						</TableRow>
					  ))
					  :null
					  }
					</TableBody>
				  </Table>
				</TableContainer>
				
				{loadContacts?
				<Pagination defaultPageSize={2} 
				current={loadContacts.data.current_page}
				className="pagination-restyle"
				total = {loadContacts.data.total}
				onChange={this.onChange}
				prevIcon={<ArrowBackIosIcon/>}
				jumpNextIcon={<ArrowForwardIcon/>}
				jumpPrevIcon={<ArrowBackIcon/>}
				nextIcon={<ArrowForwardIosIcon/>}
				/>
				: null}
            </div>
        );
    }
}

const mapDisPatchToProps = (dispatch) => {
    return {
        loadContactUser:(page) => dispatch(loadContactUser(page)),
		loadSearchContactUser:(search_content,page) => dispatch(loadSearchContactUser(search_content,page)),
		deleteContactUser:(id) => dispatch(deleteContactUser(id))
    }
}

const mapStateToProps = (state) => {
    return {
		loadContacts:state.contact.loadContacts
    }
}
 
export default connect(mapStateToProps,mapDisPatchToProps)(ViewContact);