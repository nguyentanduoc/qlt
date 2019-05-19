import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAddress, getSpecLevelBranch, resetBranch, save} from '../../actions/branchAction';
import Select from 'react-select';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
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
      specLevelBranch: {},
      flgError: false
    }
  }

  componentWillMount() {
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
        this.props.onGetAddress([position.coords.longitude, position.coords.latitude])
      }, () => {
        this.setState({latitude: 'err-latitude', longitude: 'err-longitude'})
      })
    }
  }

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.type === 'checkbox') {
      switch (name) {
        case 'isEnabled':
          this.setState({
            isEnabled: !this.state.isEnabled
          });
          break;

        case 'isMain':
          this.setState({
            isMain: !this.state.isMain
          });
          break;

        case 'specLevelBranch':
          this.setState({
            specLevelBranch: value,
            flgError: false
          });
          break;

        default:
          break;
      }
    } else {
      this.setState({
        [name]: value
      });
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.specLevelBranch.value) {
      this.props.onSave(this.state);
    } else {
      this.setState({
        flgError: true
      });
    }
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {address, branch} = this.props.branchReducer;
    let {id, latitude, longitude, name, isEnabled} = branch;
    if (this.props.branchReducer.flgSet) {
      this.setState({
        id: id,
        latitude: latitude,
        longitude: longitude,
        name: name,
        address: address,
        isEnabled: isEnabled
      });
      this.props.onResetBranch();
    }
    if (prevProps.branchReducer.address !== '' && this.state.address === '') {
      this.setState({address: address})
    }
  }

  handleSelections(option) {
    this.setState({
      specLevelBranch: option
    });
  }

  render() {
    const {specLevelBranchReducer} = this.props.branchReducer;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} onReset={this.handleReset.bind(this)}>
        <Card>
          <CardHeader>
            <strong>Chi Nhánh</strong>
          </CardHeader>
          <CardBody>
            <Alert color='danger' className="text-center" isOpen={this.state.flgError}>
              Hãy chọn Cấp độ chi nhánh
            </Alert>
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
                    name="specLevelBranch"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    type="textarea"
                    id="address"
                    name="address"
                    placeholder="Địa chỉ"
                    required
                    onChange={this.changeHandler.bind(this)}
                    value={this.state.address ? this.state.address : ''}/>
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
  onResetBranch: () => {
    return dispatch(resetBranch());
  },
  onGetSpecLevelBranch: () => {
    return dispatch(getSpecLevelBranch());
  },
  onGetAddress: (coordinate) => {
    return dispatch(getAddress(coordinate))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormBranch)
