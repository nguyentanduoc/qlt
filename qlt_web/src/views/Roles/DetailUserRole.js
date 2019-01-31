import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'reactstrap/lib/Card';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardBody from 'reactstrap/lib/CardBody';
import { updateUser } from '../../actions/userAction';
import { Form, FormGroup, CustomInput, Button, Alert } from 'reactstrap';

class DetailUserRole extends Component {
    constructor(props){
        super(props);
        this.state = {user: this.props.user}
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    changeHandler(event) {
        const roleId = event.target.name;
         if(event.target.type === 'checkbox' ) {
            let roles = this.state.user.roles;
            if(!event.target.checked) {
                roles = this.state.user.roles.filter(role=>{
                    return role.id !== parseInt(roleId)
                });
            }
            else {
                var addRoles = this.props.role.roles.filter(role => {
                    return role.id === parseInt(roleId)
                });
                roles.push(addRoles[0]);
            }
            var user = {...this.state.user, roles:roles};
            this.setState({
                user: user
            });
        }
    }
    async handleSubmit(event){
        event.preventDefault();
        await this.props.onUpdateUser(this.state.user);
    }
  render() {
    let checked = roleId => {
        let roles = this.state.user.roles.filter(role => {
            return role.id === roleId
        });
    return roles[0] ? true: false;
    }
    return (
        <Card>
            <CardHeader>
                <i className="fa fa-user"></i>Thông tin quyền
            </CardHeader>
            <CardBody>
                <Alert color="success" className="text-center" isOpen={this.props.userReducer.updateIsSuccess}>
                    Cập nhật thành công
                </Alert>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <div>
                            {this.props.role.roles.map(role => (
                                <CustomInput 
                                    key={role.id} 
                                    type="checkbox"
                                    id={role.id} 
                                    label={role.detail}
                                    name = {role.id}
                                    checked={checked(role.id)}
                                    onChange = {this.changeHandler}/>
                            ))}
                        </div>
                    </FormGroup>
                    <Button type="submit">Lưu</Button>
                </Form>
            </CardBody>
        </Card>
    )
  }
}

const mapStateToProps = (state) => {
    return { 
        role: state.role,
        userReducer: state.user
    }
}

const mapDispathToProps = (dispatch, props) => {
    return {
        onUpdateUser : async (user) => {
            return dispatch(updateUser(user));
        }
    }
  }
export default connect(mapStateToProps, mapDispathToProps)(DetailUserRole);
