import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import { save } from '../../actions/productAction'
import '../../scss/inputImange.scss'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Label,
  Badge,
  Form,
  Input,
  InputGroupAddon,
  Button,
  InputGroup
  } from 'reactstrap'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
registerPlugin(FilePondPluginImagePreview);

export class index extends Component {

  constructor(props){
    super(props);
    this.state = {
      productName: '',
      virtue: '',
      image:'',
      active: false,
      imageSrc: '',
      loaded: false
    }
  }
  onFileChange(e, file) {
    var file = file || e.target.files[0],
        pattern = /image-*/,
        reader = new FileReader();
    console.log(file);
    if (!file.type.match(pattern)) {
        alert('Formato inválido');
        return;
    }
    
    this.setState({ loaded: false });
    
    
    
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.setState({ 
          imageSrc: reader.result, 
          loaded: true 
      }); 
  }
    console.log(reader.result);
}
  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const model = {
      productName: this.state.productName,
      virtue: this.state.virtue
    }
    const data = new FormData(this.state);
    data.append('file', this.state.image);
    data.append('model',JSON.stringify(model));
    this.props.onSave(data);
    
  }
  onReset = (e) => {
    e.preventDefault();
  }
  render() {
    let state = this.state,
    props = this.props,
    labelClass  = `uploader ${state.loaded && 'loaded'}`,
    borderColor = state.active ? props.activeColor : props.baseColor,
    iconColor   = state.active 
        ? props.activeColor
        : (state.loaded) 
            ? props.overlayColor 
            : props.baseColor;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>

          </CardHeader>
          <CardBody>
            <Row>
              <Col md='6'>
              <Form onSubmit={this.onSubmit.bind(this)} onReset={this.onReset.bind(this)}>
                <Input type='hidden' name='id' onChange= {this.changeHandler.bind(this)}/>
                <FormGroup>
                  <Label>Tên Thuốc</Label>
                  <Input
                    type="text"
                    name="productName"
                    placeholder="Tên Thuốc" 
                    required
                    onChange={this.changeHandler.bind(this)}
                    value={this.state.productName}/>
                </FormGroup>
                <FormGroup>
                  <Label>Công Dụng</Label>
                  <Input
                    type="textarea"
                    name="virtue"
                    placeholder="Công Dụng" 
                    required
                    onChange={this.changeHandler.bind(this)}
                    value={this.state.virtue}/>
                </FormGroup>
                <FormGroup>
                  <Label>Ảnh</Label>
                  <input type="file" accept="image/*" onChange={this.onFileChange.bind(this)} ref="input" />
                  <img src={this.setState.imageSrc}/>
                </FormGroup>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Lưu</Button>
                <Button type="reset" size="sm" color="danger" ><i className="fa fa-ban"></i> Làm Rỗng</Button>
              </Form>
              </Col>
            </Row>
            
          </CardBody>
          <CardFooter>

          </CardFooter>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispath) => ({
  onSave: (form) => {
    return dispath(save(form));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(index)
