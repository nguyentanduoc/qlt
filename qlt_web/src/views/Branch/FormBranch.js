import React, { Component } from 'react'
import { connect } from 'react-redux'
import { save, resetBranch, selectAllShop } from '../../actions/branchAction'
import AlertCommon from '../Common/AlertCommon'
import { resetAlert } from  '../../actions/alertAction'
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

  constructor(props){
    super(props)
    this.state = {
      id: '',
      latitude: '',
      longitude: '',
      name: '',
      address: '',
      isEnabled: true,
      idDirector: this.props.authReducer.user.id
    }
  }
  componentWillMount(){
    this.props.onSelectAllShop();
  }
  componentDidMount(){
    this.getLocation();
  }
  getLocation() {
    const location = window.navigator && window.navigator.geolocation
    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }
  }
  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.type === 'checkbox' & name === 'isEnabled') {
      this.setState({
        isEnabled: !this.state.isEnabled
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.onSave(this.state);
  }
  handleReset = (e) => {
    this.setState({
      id:'',
      latitude: '',
      longitude: '',
      name:'',
      address:'',
      isEnabled:true,
    });
    this.getLocation();
  }
  componentWillUnmount(){
    this.props.onResetAlert();
  }
  componentDidUpdate(){
    if(this.props.branchReducer.flgSet) {
      let branch = this.props.branchReducer.branch;
      this.setState({
        id: branch.id,
        latitude: branch.latitude,
        longitude: branch.longitude,
        name:branch.name,
        address:branch.address,
        isEnabled:branch.isEnabled
      });
      this.props.onResetBranch();
    }
  }
  checkEmpty = (str) => {
    return (!str || 0 === str.length);
  }
  render() {
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
                    value={this.checkEmpty(this.state.address) === true ? "" : this.state.address}/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="longitude">Kinh Độ</Label>
                  <Input type="text" name="lon" id="lon" disabled value={this.state.longitude} required onChange={this.changeHandler.bind(this)}/>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="latitude">Vĩ Độ</Label>
                  <Input type="text" name="lat" id="lat" disabled value={this.state.latitude} required onChange={this.changeHandler.bind(this)}/>
                </FormGroup>
              </Col>
            </Row>
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
                      value = {this.state.isEnabled} />
                </Col>
            </FormGroup>
          </CardBody>
          <CardFooter className='text-right'>
            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
            <Button type="reset" size="sm" color="danger" ><i className="fa fa-ban"></i> Reset</Button>
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
})

const mapDispatchToProps = (dispatch) => ({
  onSave: (branch) => {
    return dispatch(save(branch));
  },
  onResetAlert: () =>  {
    return dispatch(resetAlert());
  },
  onResetBranch: ()  => {
    return dispatch(resetBranch());
  },
  onSelectAllShop: () => {
    return dispatch(selectAllShop());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FormBranch)
