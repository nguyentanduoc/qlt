import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'filepond/dist/filepond.min.css'
import {init, save} from '../../../actions/productAction'
import {FilePond, registerPlugin} from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import AlertCommon from '../../Common/AlertCommon'
import {resetAlert} from '../../../actions/alertAction'
import Select from 'react-select'
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap'
import ModalProducer from "./ModalProducer";
import ModalCreateSpecUnit from "./ModalCreateSpecUnit";
import PropTypes from "prop-types";
import ModalCreateUnit from "./ModalCreateUnit";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      virtue: '',
      image: '',
      active: false,
      imageSrc: '',
      specUnits: [],
      unit: {},
      producerSeletion: {},
      flgOpenModal: false,
      flgOpenModalSpec: false,
      flgOpenModalUnit: false
    }
  }

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const model = {
      productName: this.state.productName,
      virtue: this.state.virtue,
      specUnits: this.state.specUnits,
      unit: this.state.unit,
      producerSeletion: this.state.producerSeletion
    };
    const data = new FormData();
    data.append('file', this.state.files[0]);
    data.append('model', JSON.stringify(model));
    this.props.onSave(data);
  };
  onReset = (e) => {
    e.preventDefault();
  };
  componentWillMount() {
    this.props.onInit();
  }
  handleSeletion = (e, selection) => {
    switch (selection.name) {
      case "specUnits":
        this.setState({
          specUnits: e
        });
        break;
      case "unit":
        this.setState({
          unit: e
        })
        break;
      case "producerSeletion":
        this.setState({
          producerSeletion: e
        })
        break;
      default:
        break;
    }

  }

  componentWillUnmount() {
    this.props.onResetAlert();
  }
  toggleModal = (e) => {
    e.preventDefault();
    this.setState({
      flgOpenModal: !this.state.flgOpenModal
    })
  };
  toggleModalCreateSpec = () => {
    this.setState({
      flgOpenModalSpec: !this.state.flgOpenModalSpec
    })
  };
  toggleModalUnit=()=>{
    this.setState({
      flgOpenModalUnit: !this.state.flgOpenModalUnit
    })
  };
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fas fa-plus"/> Tạo <strong>Sản Phẩm</strong>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md='6'>
                <AlertCommon/>
                <Card>
                  <CardBody>
                    <Form onSubmit={this.onSubmit.bind(this)} onReset={this.onReset.bind(this)}>
                      <Input type='hidden' name='id' onChange={this.changeHandler.bind(this)}/>
                      <FormGroup row>
                        <Col md={3}>
                          <Label htmlFor="productName">Tên Thuốc</Label>
                        </Col>
                        <Col md={9}>
                          <Input
                            type="text"
                            name="productName"
                            placeholder="Tên sản phẩm"
                            required
                            onChange={this.changeHandler.bind(this)}
                            value={this.state.productName}/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={3}><Label htmlFor="virtue">Công Dụng</Label></Col>
                        <Col md={9}>
                          <Input
                            type="textarea"
                            name="virtue"
                            placeholder="Công Dụng"
                            required
                            onChange={this.changeHandler.bind(this)}
                            value={this.state.virtue}/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={3}><Label htmlFor="unit">Đơn vị chuẩn</Label></Col>
                        <Col md={7}>
                          <Select
                            options={this.props.productReducer.units}
                            onChange={this.handleSeletion.bind(this)}
                            isMulti={false}
                            name="unit"
                          />
                        </Col>
                        <Col md={2}>
                          <Button onClick={this.toggleModalUnit} color={'success'}>
                            <i className="fas fa-plus-circle"/>
                          </Button>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={3}><Label htmlFor="specUnits">QĐ Đơn Vị</Label></Col>
                        <Col md={7}>
                          <Select
                            options={this.props.productReducer.specUnits}
                            onChange={this.handleSeletion.bind(this)}
                            isMulti={true}
                            name="specUnits"/>
                        </Col>
                        <Col md={2}>
                          <Button onClick={this.toggleModalCreateSpec} color={'success'}>
                            <i className="fas fa-plus-circle"/>
                          </Button>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={3}><Label htmlFor="producer">Nhà sản xuất</Label></Col>
                        <Col md={7}>
                          <Select
                            options={this.props.productReducer.producers}
                            onChange={this.handleSeletion.bind(this)}
                            isMulti={false}
                            name="producerSeletion"
                          />
                        </Col>
                        <Col md={2}>
                          <Button onClick={this.toggleModal} color={'success'}>
                            <i className="fas fa-plus-circle"/>
                          </Button>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={3}><Label>Ảnh</Label></Col>
                        <Col md={9}>
                          <FilePond
                            ref={ref => (this.pond = ref)}
                            files={this.state.files}
                            allowMultiple={false}
                            onupdatefiles={fileItems => {
                              this.setState({
                                files: fileItems.map(fileItem => fileItem.file)
                              });
                            }}
                            labelIdle={'Kéo thả hoặc nhấp chọn <span class="filepond--label-action">Mở</span>'}
                          />
                        </Col>
                      </FormGroup>
                      <CardFooter className={'text-right'}>
                        <Button type="submit" size="sm" color="primary">
                          <i className="fa fa-dot-circle-o"/> Lưu</Button> {' '}
                        <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"/> Làm Rỗng</Button>
                      </CardFooter>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <ModalProducer flgOpenModal={this.state.flgOpenModal} toggleModal={this.toggleModal}/>
        <ModalCreateSpecUnit  isOpen={this.state.flgOpenModalSpec} toggle={this.toggleModalCreateSpec}/>
        <ModalCreateUnit flgOpenModal={this.state.flgOpenModalUnit} toggleModal={this.toggleModalUnit}/>>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  productReducer: state.productReducer,
});

const mapDispatchToProps = (dispath) => ({
  onSave: (form) => {
    return dispath(save(form));
  },
  onInit: () => {
    return dispath(init());
  },
  onResetAlert: () => {
    return dispath(resetAlert());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)
