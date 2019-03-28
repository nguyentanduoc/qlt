import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardHeader, CardFooter, CardBody, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import {Button, Table} from 'antd';
import DatePicker from 'react-datepicker';
import {getAllProduct} from '../../../actions/exportAction';
import AlertCommon from "../../Common/AlertCommon";
import Select from 'react-select';

class CreateBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateCreated: new Date(),
      dataSource: [],
      total: 0,
      productSelection: []
    }
  }
  componentWillMount() {
    this.props.onGetAllProduct(this.props.authenticationReducer.branch);
  }
  handleSelection(e){

  }
  render() {
    console.log(this.props.exportReducer.productSelection);
    return (
      <Card>
        <CardHeader>
          <strong>Lập Hóa Bán Sản Phẩm</strong>
        </CardHeader>
        <CardBody>
          <Card>
            <CardBody>
              <AlertCommon/>
              <Form className={'form-inline'}>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for={'dateCreated'} className='pr-1'>Ngày Tạo</Label>
                      <DatePicker
                        selected={this.state.dateCreated}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        name='dateCreated'
                        disabled={true}/>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for={'productName'} className='pr-1'>Tên Sản Phẩm</Label>
                      <br/>
                      <Select
                        className={'form-control'}
                        options={this.props.exportReducer.productSelection}
                        onChange={this.handleSelection.bind(this)}
                        isMulti = {false}
                        name="productName"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for={'unit'} className='pr-1'>Đơn vị</Label>
                      <Input type={'text'} name={'unit'} id={'unit'}/>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for={'productPrice'} className='pr-1'>Giá Sản Phẩm</Label>
                      <Input type={'text'} name={'productPrice'} id={'productPrice'} disabled/>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup className={'pr-1'}>
                      <Label for={'amount'}>Số lượng tồn</Label>
                      <Input type={'text'} name={'amount'} id={'amount'} className={'text-right'} disabled/>
                    </FormGroup>
                    <FormGroup className={'text-right'}>
                      <Button type={'primary'} icon={'plus'} className={'mt-2'}>Thêm Sản Phẩm</Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <Row>
            <Col md={{ size: 4, order: 3, offset: 8 }}>
              <FormGroup row>
                <Label md={4}>Thành tiền</Label>
                <Col sm={8}>
                  <Input className={'text-right'} md={8} type={'text'} value={this.state.total} disabled/>
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Table bordered={true} dataSource={this.state.dataSource} rowKey='key'>
            <Table.Column
              title={'STT'}
              dataIndex={'key'}
              key={'key'}/>
            <Table.Column
              title={'Tên Sản Phẩm'}
              dataIndex={'productName'}
              key={'productName'}/>
            <Table.Column
              title={'Đơn vị'}
              dataIndex={'unit'}
              key={'unit'}/>
            <Table.Column
              title={'Đơn Giá'}
              dataIndex={'price'}
              key={'price'}/>
          </Table>
        </CardBody>
        <CardFooter>

        </CardFooter>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticationReducer: state.auth,
  exportReducer: state.exportReducer
})
const mapDispatchToProps = (dispatch) =>  ({
  onGetAllProduct: (branch) => {
    return dispatch(getAllProduct(branch));
  }
})

export default connect(
  mapStateToProps,mapDispatchToProps
)(CreateBill);
