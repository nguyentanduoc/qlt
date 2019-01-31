import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'reactstrap/lib/Card';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardBody from 'reactstrap/lib/CardBody';
import { getAllRole } from '../../actions/roleAction';
import { Form, FormGroup, CustomInput } from 'reactstrap';
import Label from 'reactstrap/lib/Label';

class DetailUserRole extends Component {
//   static propTypes = {
//     prop: PropTypes
//   }
    async componentWillMount(){
        this.props.onGetAllUser();
    }
    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(event.target, name, value, value === 'on' ? 'off' : 'on');
        if(event.target.type === 'checkbox' ) {
            this.setState({
                [name]: value === 'on' ? 'off' : 'on'
          });
        }       
      }

    
    checked = roleName => {
        if(this.props.user.user.roles){
            let roles = this.props.user.user.roles.filter(role => {
                return role.name === roleName
            });
            if(roles[0]) return true;
        }
        return false;
    }
  render() {
      
    return (
        <Card>
            <CardHeader>
                <i className="fa fa-user"></i>Thông tin quyền
            </CardHeader>
            <CardBody>
                <Form>
                    <FormGroup>
                    <div>
                        {this.props.role.roles.map(role => (
                            <CustomInput 
                                key={role.id} 
                                type="checkbox" id={role.id} 
                                label={role.detail}
                                name = {role.name}
                                checked={this.checked(role.name)}
                                onChange = {this.changeHandler}/>
                        ))}
                    </div>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    )
  }
}

const mapStateToProps = (state) => {
    return { 
        user: state.user,
        role: state.role
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
      onGetAllUser : async () => {
        return dispatch(getAllRole());
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DetailUserRole);
