import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, Col, Row, Table} from 'reactstrap';
import mathRound from "../../../helpers/decimalAdjustment";

class ExportBillToPdf extends Component {
  printDocument = () => {
    const input = document.getElementById('divToPrint');
    const printContents = input.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {isPrint} = this.props.exportReducer;
    const {isShow} = this.props.alertReducer;
    if (isPrint && isShow) {
      this.printDocument();
    }
  }

  render() {
    const {branch} = this.props.authenticationReducer;
    const {dataViews, total} = this.props.exportReducer;
    return (
      <div style={{"display":"none"}}>
        <div id="divToPrint" className="mt4" style={{"fontFamily": 'Times New Roman'}}>
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
                {dataViews.map((object, key) => (
                  <tr key={key}>
                    <th scope="row">{key + 1}</th>
                    <td>{object.productName}</td>
                    <td>{object.amount}</td>
                    <td>{object.specUnit}</td>
                    <td>{object.price}</td>
                  </tr>
                ))}
                </tbody>
              </Table>
              <div className={'text-right'}>
                <strong>Tổng Tiền: {mathRound(total, -3)}</strong>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
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
