import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Table, Pagination, Card, Col, CardHeader, CardBody, Badge, PaginationItem, PaginationLink } from 'reactstrap';
import { getAllUser, showUser } from '../../actions/UserAction';
import DetailUserRole from './DetailUserRole';
import { getAllRole, openDetailRolesOfUser } from '../../actions/roleAction';
import Moment from 'react-moment';
import 'moment-timezone';

class Role extends Component {
//   static propTypes = {
//     prop: PropTypes
//   }
    constructor(props) {
        super(props);
        this.state = {user :{}, isOpenRole : false };
    }
    async componentWillMount(){
        await this.props.onGetAllUser();
        await this.props.onGetAllRole();
    }
    async handleClick(userID){
        const filter = this.props.user.users.filter((item) => {
            return item.id === userID;
        });
        this.props.onOpenDetailRoleOfUser(filter[0]);
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="8">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-user"></i> Danh sách Tài Khoản
                            </CardHeader>
                            <CardBody>
                                <Table responsive className="table-hover">
                                    <thead>
                                        <tr>
                                            <th>Tên</th>
                                            <th>Email</th>
                                            <th>Ngày tạo</th>
                                            <th>Hoạt động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.user.users.map((user) => {
                                        return (
                                            <tr className="column-select" key={user.id} onClick={this.handleClick.bind(this, user.id)}>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td><Moment format="DD/MM/YYYY">{user.createdAt}</Moment></td>
                                                <td><Badge color="success">Active</Badge></td>
                                            </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                                <Pagination>
                                    <PaginationItem>
                                        <PaginationLink previous tag="button"></PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem active>
                                        <PaginationLink tag="button">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink next tag="button"></PaginationLink>
                                    </PaginationItem>
                                </Pagination>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" lg="4">
                        {this.props.roleReducer.isOpenRoleListOfUser ? ( <DetailUserRole />) : "" }
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    roleReducer: state.role
})

const mapDispathToProps = (dispatch, props) => {
    return {
        onGetAllUser : async () => {
            return dispatch(getAllUser());
        },
        onShowUser: (user) =>{
            return dispatch(showUser(user));
        },
        onGetAllRole : async () => {
            return dispatch(getAllRole());
        },
        onOpenDetailRoleOfUser: (user) => {
            return dispatch(openDetailRolesOfUser(user));
        }
    }
  }

export default connect(mapStateToProps, mapDispathToProps)(Role)
