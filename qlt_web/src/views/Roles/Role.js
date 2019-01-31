import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Table, Pagination, Card, Col, CardHeader, CardBody, Badge, PaginationItem, PaginationLink } from 'reactstrap';
import { getAllUser, showUser } from '../../actions/userAction';
import DetailUserRole from './DetailUserRole';

export class Role extends Component {
//   static propTypes = {
//     prop: PropTypes
//   }
    async componentWillMount(){
        await this.props.onGetAllUser();
    }
    handleClick(userID){        
        const filter = this.props.user.users.filter((item) => {
            return item.id === userID;
        });
        this.props.onShowUser(filter[0]);
    }
    render() {
        let userList = this.props.user.users.map((user) => {
                    return (
                        <tr key={user.id} onClick={this.handleClick.bind(this, user.id)}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.createdAt}</td>
                            <td><Badge color="success">Active</Badge></td>
                        </tr>
                        )
                    });
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="6">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-user"></i> Danh sách Tài Khoản
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Tên</th>
                                            <th>Email</th>
                                            <th>Ngày tạo</th>
                                            <th>Hoạt động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {userList}
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
                                        <PaginationLink tag="button">2</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink tag="button">3</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink tag="button">4</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink next tag="button"></PaginationLink>
                                    </PaginationItem>
                                </Pagination>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" lg="6">
                        <DetailUserRole/>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispathToProps = (dispatch, props) => {
    return {
        onGetAllUser : async () => {
            return dispatch(getAllUser());
        },
        onShowUser: (user) =>{
            return dispatch(showUser(user));
        }
    }
  }

export default connect(mapStateToProps, mapDispathToProps)(Role)
