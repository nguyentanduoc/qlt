import React, {Component} from 'react';
import {connect} from 'react-redux';
import {save, resetBranch, selectAllShop, getSpecLevelBranch, getAddress} from '../../actions/branchAction';
import AlertCommon from '../Common/AlertCommon';
import {resetAlert} from '../../actions/alertAction';
import _ from 'lodash';
import Select from 'react-select';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  CustomInput,
  Label,
  Row,
  Form,
} from 'reactstrap'

class FormBranch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      latitude: '',
      longitude: '',
      name: '',
      address: '',
      isEnabled: true,
      idDirector: this.props.authReducer.user.id,
      isMain: false,
      specLevelBranch:{}
    }
  }
  componentWillMount() {
    this.props.onResetAlert();
    this.props.onSelectAllShop();
    this.props.onGetSpecLevelBranch();
  }
  componentDidMount() {
    this.getLocation();
  }
  getLocation() {
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        this.props.onGetAddress([position.coords.longitude,position.coords.latitude])
      }, () => {
        this.setState({latitude: 'err-latitude', longitude: 'err-longitude'})
      })
    }
  }
  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.type === 'checkbox') {
      if (name === 'isEnabled') {
        this.setState({
          isEnabled: !this.state.isEnabled
        });
      }
      if (name === 'isMain') {
        this.setState({
          isMain: !this.state.isMain
        });
      }
    } else {
      this.setState({
        [name]: value
      });
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.onSave(this.state);
  };
  handleReset = (e) => {
    e.preventDefault();
    this.setState({
      id: '',
      latitude: '',
      longitude: '',
      name: '',
      address: '',
      isEnabled: true,
      isMain: false
    });
    this.getLocation();
  };
  componentWillUnmount() {
    this.props.onResetAlert();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.branchReducer.flgSet) {
      let branch = this.props.branchReducer.branch;
      this.setState({
        id: branch.id,
        latitude: branch.latitude,
        longitude: branch.longitude,
        name: branch.name,
        address: branch.address,
        isEnabled: branch.isEnabled
      });
      this.props.onResetBranch();
    }
  }
  checkEmpty = (str) => {
    return (!str || 0 === str.length);
  };
  handleSelections(option) {
    this.setState({
      specLevelBranch: option
    });
  }
  render() {
    const {specLevelBranchReducer, branches, address} = this.props.branchReducer;
    const enabledSwitchMainBranch = () => {
      const result = _.find(branches, function (o) {
        return o.isMain === true
      });
      return result ? true :  false;
    };

    return (
      <Form onSubmit={this.handleSubmit.bind(this)} onReset={this.handleReset.bind(this)}>
        <Card>
          <CardHeader>
            <strong>Chi Nhánh</strong>
          </CardHeader>
          <CardBody>
            <AlertCommon/>
            <Row>
              <Col xs="12">
                <Input type={'hidden'} name='id' id='id' value={this.state.id}/>
                <FormGroup>
                  <Label htmlFor="name">Tên Chi Nhánh</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Tên Chi Nhánh"
                    required
                    onChange={this.changeHandler.bind(this)}
                    value={this.state.name}/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label>Cấp độ chi nhánh</Label>
                  <Select
                    options={specLevelBranchReducer}
                    onChange={this.handleSelections.bind(this)}
                    isMulti={false}
                    name="product"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="address ">Địa chỉ</Label>
                  <Input
                    type="textarea"
                    id="address"
                    name="address"
                    placeholder="Địa chỉ"
                    required
                    onChange={this.changeHandler.bind(this)}
                    value={this.checkEmpty(this.state.address) === true ? address : this.state.address}/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="longitude">Kinh Độ</Label>
                  <Input type="text" name="lon" id="lon" disabled value={this.state.longitude} required
                         onChange={this.changeHandler.bind(this)}/>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="latitude">Vĩ Độ</Label>
                  <Input type="text" name="lat" id="lat" disabled value={this.state.latitude} required
                         onChange={this.changeHandler.bind(this)}/>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup row>
              <Col md="6"><Label>Chi Nhánh Chính</Label></Col>
              <Col md="6" xs="12">
                <CustomInput
                  disabled={enabledSwitchMainBranch()}
                  type="switch"
                  id='isMain'
                  label='Hoạt động'
                  name='isMain'
                  checked={this.state.isMain}
                  onChange={this.changeHandler.bind(this)}
                  value={this.state.isMain}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="6"><Label>Hoạt động</Label></Col>
              <Col md="6" xs="12">
                <CustomInput
                  type="switch"
                  id='isEnabled'
                  label='Hoạt động'
                  name='isEnabled'
                  checked={this.state.isEnabled}
                  onChange={this.changeHandler.bind(this)}
                  value={this.state.isEnabled}/>
              </Col>
            </FormGroup>
          </CardBody>
          <CardFooter className='text-right'>
            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"/> Lưu</Button> {' '}
            <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"/> Làm Rỗng</Button>
          </CardFooter>
        </Card>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  alertReducer: state.alertReducer,
  branchReducer: state.branchReducer,
  authReducer: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  onSave: (branch) => {
    return dispatch(save(branch));
  },
  onResetAlert: () => {
    return dispatch(resetAlert());
  },
  onResetBranch: () => {
    return dispatch(resetBranch());
  },
  onSelectAllShop: () => {
    return dispatch(selectAllShop());
  },
  onGetSpecLevelBranch: () => {
    return dispatch(getSpecLevelBranch());
  },
  onGetAddress: (coordinate) =>{
    return dispatch(getAddress(coordinate))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormBranch)
