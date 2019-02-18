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
    CardFooter,
    ButtonGroup
    } from 'reactstrap';
import FormAccount from './FormAccount'
import Moment from 'react-moment';
import 'moment-timezone';
import PaginationCommon from '../Common/PaginationCommon';
import { resetClicked } from '../../actions/paginationAction'
import { pageRequestDefault, pageCustom } from '../../helpers/pageable'
import FieldEnableCommon from '../Common/FieldEnableCommon';
import ReactTable from 'react-table';
import _ from 'lodash';
import TableAccount from './TableAccount'
import treeTableHOC from "react-table/lib/hoc/treeTable";
const TreeTable = treeTableHOC(ReactTable);

export class index extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            txtCondition:'',
            columns: [
                {
                    accessor: 'id',
                    Header: 'ID'
                },
               {
                accessor: 'username',
                   Header: 'Tên Tài Khoản'
                },
                {
                    accessor: 'email',
                    Header: 'Địa Chỉ Email'
                 },
                 {
                    accessor: 'createdAt',
                    Header: 'Ngày Tạo',
                    Cell: props => <Moment format="DD/MM/YYYY">{props.value}</Moment>
                 },
                 {
                    accessor: 'isEnabled',
                    Header: 'Hoạt động',
                    Cell: props => <Badge color={props.value? 'success': 'danger'}>{props.value? 'Hoạt động': 'Dừng hoạt động'}</Badge>
                 },
                 {
                    Header: 'Hành Động',
                    Cell: props => (
                        <ButtonGroup>
                            <Button size="sm"  onClick={this.props.handleView.bind(this, props)}><i className="far fa-eye"></i></Button>
                            <Button size="sm" onClick={this.handleEdit(props.value)}><i className="far fa-edit"></i></Button>
                            <Button size="sm" onClick={this.handleDelete(props.value)}><i className="far fa-trash-alt"></i></Button>
                        </ButtonGroup>
                    )
                 }
            ]
        };
    }
    componentWillMount() {
        this.props.onGetUserLimit(pageRequestDefault());
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
    handleClick = (state, rowInfo) => {
        return {
            onClick: (e, handleOriginal) => {
              this.props.onSetDetail(rowInfo.original);
            }
        }
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
    handleEdit = (value) => {
        console.log(value)
    }
    handleView = (value) => {
        console.log(value)
    }
    handleDelete = (value) => {
        console.log(value)
    }
    render() {
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
                            <TreeTable
                                    isSelected ={true}
                                    selectAll = {true}
                                    toggleAll  = 'checkbox'
                                    toggleSelection  = 'checkbox'
                                    selectType  = 'checkbox'
                                    keyField="id"
                                    data={this.props.userReducer.users}
                                    columns={this.state.columns}
                                    showPagination= {false}
                                    defaultPageSize={5}
                                    getTrProps={this.handleClick}
                                    
                                />
                            {/* <BootstrapTable 
                                selectRow={{
                                    mode: this.props.appSettingReducer.deleteMultible,
                                    clickToSelect: true,
                                    onSelect: (e) =>{
                                        this.handleClick(e);
                                    }
                                  }}
                                data={ this.props.userReducer.users } 
                                version='4'
                                striped hover deleteRow={ true } 
                                options= {options} addRow={ true } insertRow = { true } 
                                noDataIndication={ () => <NoDataIndication />}/> */}
                                    {/* <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='username'>Tên Tài Khoản</TableHeaderColumn>
                                    <TableHeaderColumn dataField='email'>Địa Chỉ Email</TableHeaderColumn>
                                    <TableHeaderColumn dataField='createdAt' dataFormat={this.dateFormat}>Ngày Tạo</TableHeaderColumn>
                                    <TableHeaderColumn dataField='isEnabled' dataFormat={this.bageFormat} customInsertEditor={{getElement: FieldEnableCommon}}>Tình trạng</TableHeaderColumn> */}
                                {/* </BootstrapTable> */}
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
