import React, {Component} from 'react'
import {connect} from 'react-redux'
import {searchUser, getUserLimit, setUserForDetail, deleteUser} from '../../actions/UserAction'
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
} from 'reactstrap'
import FormAccount from './FormAccount'
import Moment from 'react-moment'
import 'moment-timezone'
import PaginationCommon from '../Common/PaginationCommon'
import {resetClicked} from '../../actions/paginationAction'
import {pageRequestDefault, pageCustom} from '../../helpers/pageable'
import {Table} from 'antd'
import {getRolesByRoles} from '../../actions/roleAction'

export class index extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      txtCondition: '',
      columns: [
        {
          key: 'id',
          title: 'ID',
          dataIndex: 'id',
        },
        {
          key: 'username',
          title: 'Tên Tài Khoản',
          dataIndex: 'username',
        },
        {
          key: 'email',
          title: 'Địa Chỉ Email',
          dataIndex: 'email',
        },
        {
          key: 'createdAt',
          title: 'Ngày Tạo',
          dataIndex: 'createdAt',
          render: value => (<Moment format="DD/MM/YYYY">{value}</Moment>)
        },
        {
          key: 'isEnabled',
          title: 'Hoạt động',
          dataIndex: 'isEnabled',
          render: value => (
            <Badge color={value ? 'success' : 'danger'}>{value ? 'Hoạt động' : 'Dừng hoạt động'}</Badge>)
        }
      ],
      selectedRowKeys: []
    };
  }

  componentWillMount() {
    this.props.onGetUserLimit(pageRequestDefault());
    this.props.onGetRolesByRoles(this.props.authReducer.user.roles);
  }

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearchUser(this.state);
  };
  getUserPage = () => {
    this.props.onGetUserLimit(pageCustom(this.props.paginationReducer.gotoPage));
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.paginationReducer.clicked) {
      this.getUserPage();
      this.props.onResetClickedGotoPage();
    }
  }

  handleDeletedRow = async (e) => {
    e.preventDefault();
    await this.props.onDeleteUser(this.state.selectedRowKeys);
    this.props.onGetUserLimit(pageRequestDefault());
  };

  // selectRow = (record) => {
  //   const selectedRowKeys = [...this.state.selectedRowKeys];
  //   if (selectedRowKeys.indexOf(record.key) >= 0) {
  //     selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
  //   } else {
  //     selectedRowKeys.push(record.key);
  //   }
  //   this.setState({selectedRowKeys});
  // };

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys});
  };

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys) => {
        this.onSelectedRowKeysChange(selectedRowKeys);
      }
    };
    const onRow = (record) => {
      return {
        onClick: (event) => {
          event.preventDefault();
          this.props.onSetDetail(record);
        }
      };
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <i className="fas fa-list-alt"/> Danh Sách <strong>Tài Khoản</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit.bind(this)} className='form-inline justify-content-end pb-2'>
                  <InputGroup className="float-right">
                    <Input type="text" id="txtCondition" name="txtCondition" placeholder="Email hoặc Tên"
                           onChange={this.changeHandler.bind(this)}/>
                    <InputGroupAddon addonType="append">
                      <Button type="submit" color="primary" className="btn-square">
                        <i className="fas fa-search"/></Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <Button
                    color='warning' className="btn-square ml-1"
                    disabled={this.state.selectedRowKeys.length < 0}
                    onClick={this.handleDeletedRow.bind(this)}>
                    <i className="far fa-trash-alt"/>
                  </Button>
                </Form>
                <Table
                  scroll={{ x: 674 }}
                  bordered={true}
                  rowKey='id'
                  columns={this.state.columns}
                  dataSource={this.props.userReducer.users}
                  pagination={false}
                  rowSelection={rowSelection}
                  onRow={onRow}
                />
              </CardBody>
              <CardFooter className='float-right'><PaginationCommon className='pt-2'/></CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <FormAccount/>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userReducer: state.user,
  roleReducer: state.role,
  paginationReducer: state.paginationReducer,
  appSettingReducer: state.appSettingReducer,
  authReducer: state.auth
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchUser: async (coditions) => {
      return await dispatch(searchUser(coditions))
    },
    onGetUserLimit: async (page) => {
      return await dispatch(getUserLimit(page))
    },
    onResetClickedGotoPage: async () => {
      return await dispatch(resetClicked())
    },
    onSetDetail: (user) => {
      return dispatch(setUserForDetail(user))
    },
    onDeleteUser: (users) => {
      return dispatch(deleteUser(users))
    },
    onGetRolesByRoles: (role) => {
      return dispatch(getRolesByRoles(role));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(index)
