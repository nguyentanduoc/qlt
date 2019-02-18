import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchUser, getUserLimit, setUserForDetail, deleteUser } from '../../actions/UserAction'
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
    CardFooter
    } from 'reactstrap';
import FormAccount from './FormAccount'
import Moment from 'react-moment';
import 'moment-timezone';
import PaginationCommon from '../Common/PaginationCommon';
import { resetClicked } from '../../actions/paginationAction'
import { pageRequestDefault, pageCustom } from '../../helpers/pageable'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import FieldEnableCommon from '../Common/FieldEnableCommon';
import _ from 'lodash';

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
    dateFormat = (cell) => (
        <Moment format="DD/MM/YYYY">{cell}</Moment>
    )
    bageFormat = (cell) => (
        <Badge color={cell? 'success': 'danger'}>{cell? 'Hoạt động': 'Dừng hoạt động'}</Badge>
    )
    onDeleteRow = async (rows) => {
        await this.props.onDeleteUser(rows);
    }
    handleDeletedRow = (keys) => {
        let users = [];
        keys.forEach(element => {
            users.push({id: element});
        });
        _.pullAllBy(this.props.userReducer.users, users, 'id');
    }
    render() {
        const options = {
            onDeleteRow: this.onDeleteRow,
            afterDeleteRow: this.handleDeletedRow
          };
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col md="8">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col md='4'><i className="fas fa-list-alt"></i> Danh Sách <strong>Tài Khoản</strong></Col>
                                    <Col >
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
                            <BootstrapTable 
                                selectRow={{
                                    mode: this.props.appSettingReducer.deleteMultible,
                                    clickToSelect: true,
                                    onSelect: (e) =>{
                                        this.handleClick(e);
                                    }
                                  }}
                                data={ this.props.userReducer.users } 
                                version='4'
                                striped hover deleteRow={true} options= {options}>
                                    <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='username'>Tên Tài Khoản</TableHeaderColumn>
                                    <TableHeaderColumn dataField='email'>Địa Chỉ Email</TableHeaderColumn>
                                    <TableHeaderColumn dataField='createdAt' dataFormat={this.dateFormat}>Ngày Tạo</TableHeaderColumn>
                                    <TableHeaderColumn dataField='isEnabled' dataFormat={this.bageFormat} customInsertEditor={{getElement: FieldEnableCommon}}>Tình trạng</TableHeaderColumn>
                                </BootstrapTable>
                                {/* <Table hover bordered striped responsive size="sm">
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
                                </Table> */}
                            </CardBody>
                            <CardFooter><PaginationCommon className='pt-2'/></CardFooter>
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
    paginationReducer: state.paginationReducer,
    appSettingReducer: state.appSettingReducer
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
        },
        onDeleteUser: (users) => {
            return dispatch(deleteUser(users))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
