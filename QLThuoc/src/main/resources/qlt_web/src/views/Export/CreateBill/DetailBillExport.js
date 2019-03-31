import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, Col, FormGroup, Input, Label, Row} from "reactstrap";
import {Table, Button} from "antd";
import {save} from '../../../actions/exportAction';

class DetailBillExport extends Component {
  constructor(props){
    super(props);
    this.state = {
      total: 0,
    }
  }
  submit = (e) =>  {
    const {dataSubmits} = this.props.exportReducer;
    const {branch} = this.props.authenticationReducer;
    e.preventDefault();
    console.log(dataSubmits);
    this.props.onSave({
      branch: branch,
      dataSubmits: dataSubmits
    })
  }
  render() {
    const {dataViews} = this.props.exportReducer;
    return (
      <Card>
        <CardBody>
          <Row>
            <Col md={{size: '6', offset: 6}}>
              <Row>
                <Col md={8}>
                  <FormGroup inline={true} row>
                    <Label md={5}>Thành tiền</Label>
                    <Col md={7}>
                      <Input className={'text-right'} md={8} type={'text'} value={this.state.total} disabled/>
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <Button disabled={dataViews.length <= 0} onClick={this.submit}>Hoàn Tất</Button>
                </Col>
              </Row>

            </Col>
          </Row>
          <Table bordered={true} dataSource={dataViews} rowKey='productName'>
            <Table.Column
              title={'Tên Sản Phẩm'}
              dataIndex={'productName'}
              key={'productName'}/>
            <Table.Column
              title={'Đơn vị'}
              dataIndex={'specUnit'}
              key={'specUnit'}/>
            <Table.Column
              title={'Số Lượng'}
              dataIndex={'amount'}
              key={'amount'}/>
            <Table.Column
              title={'Đơn Giá'}
              dataIndex={'price'}
              key={'price'}/>
          </Table>
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state) => ({
  exportReducer: state.exportReducer,
  authenticationReducer: state.auth
});
const mapDispatchToProps = (dispatch) => ({
  onSave: (data) => {
    return dispatch(save(data));
  }
});
export default connect(
  mapStateToProps,mapDispatchToProps
)(DetailBillExport);
