import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'filepond/dist/filepond.min.css'
import { save, init } from '../../actions/productAction'
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import AlertCommon from '../Common/AlertCommon'
import Select from 'react-select'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Label,
  Form,
  Input,
  Button  } from 'reactstrap'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
export class index extends Component {

  constructor(props){
    super(props);
    this.state = {
      productName: '',
      virtue: '',
      image:'',
      active: false,
      imageSrc: '',
      specUnits: []
    }
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
      virtue: this.state.virtue,
      specUnits: this.state.specUnits
    }
    const data = new FormData();
    data.append('file', this.state.files[0]);
    data.append('model',JSON.stringify(model));
    this.props.onSave(data);
    
  }
  onReset = (e) => {
    e.preventDefault();
  }
  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
  }
  componentWillMount() {
    this.props.onInit();
  }
  handleSeletion = (e, selection) => {
    this.setState({
      specUnits: e
    })
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fas fa-plus"></i> Tạo <strong>Sản Phẩm</strong>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md='6'>
              <AlertCommon/>
              <Form onSubmit={this.onSubmit.bind(this)} onReset={this.onReset.bind(this)}>
                <Input type='hidden' name='id' onChange= {this.changeHandler.bind(this)}/>
                <FormGroup>
                  <Label htmlFor="productName">Tên Thuốc</Label>
                  <Input
                    type="text"
                    name="productName"
                    placeholder="Tên sản phẩm" 
                    required
                    onChange={this.changeHandler.bind(this)}
                    value={this.state.productName}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="virtue">Công Dụng</Label>
                  <Input
                    type="textarea"
                    name="virtue"
                    placeholder="Công Dụng" 
                    required
                    onChange={this.changeHandler.bind(this)}
                    value={this.state.virtue}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="specUnit">Quy Định Đơn Vị</Label>
                  <Select 
                    options={this.props.productReducer.specUnits}
                    onChange={this.handleSeletion.bind(this)}
                    isMulti = {true}
                    name="specUnit"
                    />
                </FormGroup>
                <FormGroup>
                  <Label>Ảnh</Label>
                  <FilePond
                    ref={ref => (this.pond = ref)}
                    files={this.state.files}
                    allowMultiple={false}
                    onupdatefiles={fileItems => {
                      this.setState({
                        files: fileItems.map(fileItem => fileItem.file)
                      });
                    }}
                    labelIdle={'Kéo thả hoặc nhấp chọn <span class="filepond--label-action"> Mở </span>'}
                  />
                </FormGroup>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Lưu</Button> {' '}
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
  productReducer: state.productReducer
})

const mapDispatchToProps = (dispath) => ({
  onSave: (form) => {
    return dispath(save(form));
  },
  onInit: () => {
    return dispath(init());
  }

})

export default connect(mapStateToProps, mapDispatchToProps)(index)
