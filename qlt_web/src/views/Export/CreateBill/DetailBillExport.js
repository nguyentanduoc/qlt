import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, Col, CustomInput, FormGroup, Row} from "reactstrap";
import {Button, Table} from "antd";
import {deleteExport, save, setIsPrint} from '../../../actions/exportAction';
import NumberFormat from 'react-number-format';
import mathRound from '../../../helpers/decimalAdjustment';
import PropTypes from 'prop-types'
import ExportBillToPdf from "./ExportBillToPDF";

class DetailBillExport extends Component {
  static propTypes = {
    isShare: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    }
  }

  submit = (e) => {
    const {dataSubmits} = this.props.exportReducer;
    const {branch} = this.props.authenticationReducer;
    e.preventDefault();
    this.props.onSave({
      branch: branch,
      dataSubmits: dataSubmits,
      isShare: this.props.isShare
    })
  };
  delete = (record) => {
    this.props.onDeleteExport(record);
  };

  setIsPrint = () => {
    this.props.onSetIsPrint()
  };

  render() {
    const {dataViews, total, isPrint} = this.props.exportReducer;
    return (
      <Card>
        <CardBody>
          <Row>
            <Col md={6}>
              <CustomInput
                type="checkbox"
                id="isPrint"
                label="In Hóa Đơn"
                defaultChecked={isPrint}
                onClick={this.setIsPrint} inline/>
              <Button
                htmlType={'button'}
                disabled={dataViews.length <= 0}
                onClick={this.submit}
                type={"primary"}>
                Hoàn Tất
              </Button>
            </Col>
            <Col md={6}>
              <FormGroup inline={true} row>
                <div className={'col-md-5'}>Thành tiền</div>
                <Col md={7}>
                  <NumberFormat
                    suffix={"  ₫"}
                    displayType={'text'}
                    thousandSeparator={true}
                    value={mathRound(total, -3)}
                    className={'text-right h5'}/>
                </Col>
              </FormGroup>
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
              key={'price'}
              render={(text) => (
                <NumberFormat
                  displayType={'text'}
                  thousandSeparator={true}
                  value={text}
                  disabled={true}
                  className={'text-right'}/>
              )}
            />
            <Table.Column
              title={'Thao tác'}
              dataIndex={'action'}
              key={'action'}
              render={(text, record) => (
                <Button
                  htmlType={'button'}
                  type="danger"
                  size={'default'}
                  icon={'minus-circle'}
                  onClick={this.delete.bind(this, record)}/>
              )}/>
          </Table>
        </CardBody>
        <div style={{display: 'none'}}>
          <ExportBillToPdf/>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  exportReducer: state.exportReducer,
  authenticationReducer: state.auth
});
const mapDispatchToProps = (dispatch) => ({
  onSave: (data) => dispatch(save(data)),
  onDeleteExport: (data) => dispatch(deleteExport(data)),
  onSetIsPrint: () => dispatch(setIsPrint())
});
export default connect(
  mapStateToProps, mapDispatchToProps
)(DetailBillExport);
