import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'reactstrap/lib/Card';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardBody from 'reactstrap/lib/CardBody';
import { updateUserRole, setSetCloseAlert } from '../../actions/userAction';
import { setRoleUser, removeUserRoleDetail } from '../../actions/roleAction';
import { Form, FormGroup, CustomInput, Button, Alert, Col, Label, CardFooter } from 'reactstrap';

class DetailUserRole extends Component {
    constructor(props){
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    changeHandler(event) {
        const roleId = event.target.name;
         if(event.target.type === 'checkbox' ) {
            let userRoleDetail = this.props.roleReducer.userRoleDetail;
            if(!event.target.checked) {
                userRoleDetail.roles = this.props.roleReducer.userRoleDetail.roles.filter(role=>{
                    return role.id !== parseInt(roleId)
                });
            }
            else {
                var addRoles = this.props.roleReducer.roles.filter(role => {
                    return role.id === parseInt(roleId)
                });
                userRoleDetail.roles.push(addRoles[0]);
            }
            this.props.onSetRoleUser(userRoleDetail);
        }
    }
    async handleSubmit(event){
        event.preventDefault();
        await this.props.onUpdateUser(this.props.roleReducer.userRoleDetail);
        setTimeout(
            function() {
                this.props.onSetCloseAlert();
            }
            .bind(this),
            1500
        );
    }
    componentWillUnmount(){
        this.props.omRemoveUserDetailForRole();
    }
  render() {
    let checked = roleId => {
        let roles = this.props.roleReducer.userRoleDetail.roles.filter(role => {
            return role.id === roleId
        });
    return roles[0] ? true: false;
    }
    return (
        <Card>
            <Form onSubmit={this.handleSubmit}>
            <CardHeader>
                <i className="fa fa-user"></i>Thông tin quyền
            </CardHeader>
            <CardBody>
                <Alert color="success" className="text-center" isOpen={this.props.userReducer.showAlert}>
                    Cập nhật thành công
                </Alert>
                    <FormGroup row>
                        <Col md="3">
                            <Label>Tên:</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <p className="form-control-static"><strong>{this.props.roleReducer.userRoleDetail.name}</strong></p>
                        </Col>
                        <Col md="3"><Label>Quyền:</Label></Col>
                        <Col md="9">
                            {this.props.roleReducer.roles.map(role => (
                                <CustomInput
                                    key={role.id} 
                                    type="checkbox"
                                    id={role.id} 
                                    label={role.detail}
                                    name = {role.id}
                                    checked={checked(role.id)}
                                    onChange = {this.changeHandler}/>
                            ))}
                        </Col>
                    </FormGroup>
                    {/* <Button type="submit" className="float-right" color="primary">Lưu</Button> */}
            </CardBody>
            <CardFooter className="text-right">
                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Lưu</Button>
            </CardFooter>
            </Form>
        </Card>
    )
  }
}

const mapStateToProps = (state) => {
    return { 
        roleReducer: state.role,
        userReducer: state.user
    }
}

const mapDispathToProps = (dispatch, props) => {
    return {
        onUpdateUser : async (user) => {
            return dispatch(updateUserRole(user));
        },
        onSetRoleUser: (user) => {
            return dispatch(setRoleUser(user));
        },
        onSetCloseAlert: () => {
            return dispatch(setSetCloseAlert());
        },
        omRemoveUserDetailForRole: () => {
            return dispatch(removeUserRoleDetail());
        }
    }
  }
export default connect(mapStateToProps, mapDispathToProps)(DetailUserRole);
