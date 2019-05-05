import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Row,
  Table,
  Card,
  Col,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  CustomInput,
  CardFooter,
  Button
} from 'reactstrap';
import {getAllNav, getAllSubNav, setRoleForNav, setNav, updateNav} from '../../actions/NavAction';
import {getAllRole} from '../../actions/roleAction';
import {resetAlert} from '../../actions/alertAction';
import AlertCommon from '../Common/AlertCommon';

export class SettingNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    }
  }

  componentDidMount() {
    this.props.onGetAllNav();
    this.props.onGetAllRole();
  }

  async handleClick(title) {
    this.props.onGetAllSubNav(title.id);
    this.props.onSetRoleForNav(title.roles);
    this.setState({name: title.name});
    this.props.onSetNav(title);
  }

  handleClickSub(sub) {
    this.props.onSetRoleForNav(sub.roles);
    this.setState({name: sub.name});
    this.props.onSetNav(sub);
  }

  changeHandler(event) {
    const roleId = event.target.name;
    if (event.target.type === 'checkbox') {
      let roleNav = this.props.navReducer.roleNav;
      if (!event.target.checked) {
        roleNav = this.props.navReducer.roleNav.filter(role => {
          return role.id !== parseInt(roleId)
        });
      } else {
        let addRoles = this.props.roleReducer.roles.filter(role => {
          return role.id === parseInt(roleId)
        });
        roleNav.push(addRoles[0]);
      }
      this.props.onSetRoleForNav(roleNav);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    let nav = this.props.navReducer.nav;
    nav.roles = this.props.navReducer.roleNav;
    await this.props.onUpdateNav(nav);
    setTimeout(
      function () {
        this.props.onResetAlert();
      }
        .bind(this),
      1500
    );
  }

  render() {
    const checked = roleId => {
      let roles = this.props.navReducer.roleNav.filter(role => {
        return role.id === roleId
      });
      return !!roles[0];
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="3">
            <Card>
              <CardHeader>
                <i className="fas fa-list"/><strong>Danh Mục Tiêu Đề</strong>
              </CardHeader>
              <CardBody>
                <Table responsive className="table-hover">
                  <tbody>
                  {this.props.navReducer.navTitles.map((title) => {
                    return (
                      <tr className="column-select" key={title.id} onClick={this.handleClick.bind(this, title)}>
                        <td>{title.name}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card>
              <CardHeader>
                <i className="fas fa-bars"/>Danh sách <strong>Danh Mục Con</strong>
              </CardHeader>
              <CardBody>
                <Table responsive className="table-hover">
                  <thead>
                  <tr>
                    <th>Tên Danh Mục</th>
                    <th>Địa chỉ</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.props.navReducer.subNav.map((sub) => {
                    return (
                      <tr className="column-select" key={sub.id} onClick={this.handleClickSub.bind(this, sub)}>
                        <td>{sub.name}</td>
                        <td>{sub.url}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3">
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Card>
                <CardHeader>
                  <i className="fas fa-users-cog"/>Chi tiết <strong>Quyền</strong>
                </CardHeader>
                <CardBody>
                  <AlertCommon/>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Tên:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static"><strong>{this.state.name}</strong></p>
                    </Col>
                    <Col md="3"><Label>Quyền:</Label></Col>
                    <Col md="9">
                      {this.props.roleReducer.roles.map(role => (
                        <CustomInput
                          key={role.id}
                          type="checkbox"
                          id={role.id}
                          label={role.detail}
                          name={role.id}
                          checked={checked(role.id)}
                          onChange={this.changeHandler.bind(this)}/>
                      ))}
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter className="text-right">
                  <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"/> Lưu</Button>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  navReducer: state.navReducer,
  roleReducer: state.role
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAllNav: async () => {
      return await dispatch(getAllNav());
    },
    onGetAllSubNav: async (id) => {
      return await dispatch(getAllSubNav(id));
    },
    onGetAllRole: async () => {
      return await dispatch(getAllRole());
    },
    onSetRoleForNav: (roles) => {
      return dispatch(setRoleForNav(roles));
    },
    onSetNav: (nav) => {
      return dispatch(setNav(nav));
    },
    onUpdateNav: async (nav) => {
      return await dispatch(updateNav(nav));
    },
    onResetAlert: () => {
      return dispatch(resetAlert());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingNav)
