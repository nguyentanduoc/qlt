import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, Col, Row, Table} from 'reactstrap';
import mathRound from "../../../helpers/decimalAdjustment";
import {PrintTool} from "react-print-tool"
import NumberFormat from "react-number-format";

class ExportBillToPdf extends Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {isShow} = this.props.alertReducer;
    const {branch} = this.props.authenticationReducer;
    const {printDataView, isPrint} = this.props.exportReducer;
    if (isPrint && isShow && branch.shop.nameShop && branch.name && branch.address && printDataView) {
      PrintTool.printExistingElement('#divToPrint');
    }
  }

  render() {
    const {branch} = this.props.authenticationReducer;
    const {printDataView} = this.props.exportReducer;
    if (branch.shop.nameShop && branch.name && branch.address && printDataView) {
      let total = 0;
      if (Array.isArray(printDataView) && printDataView.length > 0) {
        printDataView.forEach((data) => {
          total += data.price * data.amount;
        })
      }
      return (
        <div style={{"display": "none"}}>
          <div id="divToPrint" className="mt-4" style={{"fontFamily": 'Times New Roman'}}>
            <Card>
              <CardBody>
                <Row>
                  <Col md={6} className={'text-center'}>
                    <strong><u>{branch.shop.nameShop}</u></strong>
                    <div>{branch.name}</div>
                    <p>Địa chỉ: {branch.address}</p>
                  </Col>
                  <Col md={6} className={'text-center'}>
                    <strong>Nhà Thuốc Tây</strong>
                    <div><strong>HÓA ĐƠN BÁN HÀNG</strong></div>
                  </Col>
                </Row>
                <Table bordered>
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Tên Thuốc</th>
                    <th>Số Lượng</th>
                    <th>Đơn vị</th>
                    <th>Đơn Giá</th>
                  </tr>
                  </thead>
                  <tbody>
                  {printDataView.map((object, key) => (
                    <tr key={key}>
                      <th scope="row">{key + 1}</th>
                      <td>{object.productName}</td>
                      <td>{object.amount}</td>
                      <td>{object.specUnit}</td>
                      <td>
                        <NumberFormat
                          displayType={'text'}
                          thousandSeparator={true}
                          value={object.price}
                          disabled={true}/>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
                <div className={'text-right'}>
                  <strong>
                    Tổng Tiền:
                    <NumberFormat
                      displayType={'text'}
                      thousandSeparator={true}
                      value={mathRound(total, -3)}
                      disabled={true}/>
                  </strong>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  authenticationReducer: state.auth,
  exportReducer: state.exportReducer,
  alertReducer: state.alertReducer
});
export default connect(
  mapStateToProps,
)(ExportBillToPdf);
