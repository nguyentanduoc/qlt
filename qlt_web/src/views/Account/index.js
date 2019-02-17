import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchUser, getUserLimit, setUserForDetail } from '../../actions/UserAction'
import {
    Row,
    Col,
    Form,
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    InputGroup, 
    InputGroupAddon,
    Badge,
    Table,
    } from 'reactstrap';
import FormAccount from './FormAccount'
import Moment from 'react-moment';
import 'moment-timezone';
import PaginationCommon from '../Common/PaginationCommon';
import { resetClicked } from '../../actions/paginationAction'
import { pageRequestDefault, pageCustom } from '../../helpers/pageable'
export class index extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            txtCondition:''
        };
    }
    async componentWillMount() {
      await this.props.onGetUserLimit(pageRequestDefault());
    }
    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSearchUser(this.state);
    }
    handleClick = (user) => {
      this.props.onSetDetail(user);
    }
    getUserPage = ()  => {
        this.props.onGetUserLimit(pageCustom(this.props.paginationReducer.gotoPage));
    }
    async componentDidUpdate(){
        if(this.props.paginationReducer.clicked){
            await this.getUserPage();
            await this.props.onResetClickedGotoPage();
        }
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col md="8">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col><i className="fas fa-list-alt"></i> Danh Sách <strong>Tài Khoản</strong></Col>
                                    <Col>
                                        <Form onSubmit={this.handleSubmit.bind(this)}>
                                            <InputGroup className="float-right">
                                                <Input type="text" id="txtCondition" name="txtCondition" placeholder="Email hoặc Tên" onChange={this.changeHandler.bind(this)}/>
                                                <InputGroupAddon addonType="append">
                                                    <Button type="submit" color="primary"><i className="fas fa-search"></i></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Form>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>Tên Tài Khoản</th>
                                            <th>Địa Chỉ Email</th>
                                            <th>Ngày Tạo</th>
                                            <th>Hoạt Động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.userReducer.users.map((user) => {
                                            return(
                                                <tr key={user.id} onClick={this.handleClick.bind(this, user)}>
                                                    <td>{user.username}</td>
                                                    <td>{user.email}</td>
                                                    <td><Moment format="DD/MM/YYYY">{user.createdAt}</Moment></td>
                                                    <td><Badge color={user.isEnabled? 'success': 'danger'}>{user.isEnabled? 'Hoạt động': 'Dừng hoạt động'}</Badge></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                                <PaginationCommon/>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4">
                        <FormAccount/>
                    </Col>
                </Row>
                <Row>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userReducer : state.user,
    roleReducer: state.role,
    paginationReducer: state.paginationReducer
})

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchUser: async (coditions) => {
            return await dispatch(searchUser(coditions))
        },
        onGetUserLimit: async (page) => {
          return await dispatch(getUserLimit(page))
        },
        onResetClickedGotoPage: async () =>{
            return await dispatch(resetClicked())
        },
        onSetDetail: (user) => {
          return dispatch(setUserForDetail(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
