import React, {Component} from 'react';
import {connect} from 'react-redux';
import Card from "reactstrap/es/Card";
import CardHeader from "reactstrap/es/CardHeader";
import CardBody from "reactstrap/es/CardBody";
import CardFooter from "reactstrap/es/CardFooter";
import CsvParse from '@vtex/react-csv-parse'
import {Button, Icon, Table} from 'antd';
import _ from 'lodash';
import {saveListProduct} from '../../../actions/productAction'


class ImportProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  handleForce = (data) => {
    this.setState({
      products: data
    });
  };
  handleError = (data) => {
    console.log(data);
  };
  handleDeleteProduct = (record) => {
    const {products} = this.state;
    _.remove(products, function (n) {
      return n.id === record.id;
    });
    this.setState({
      products: products
    })
  };

  handleSubmit = async () => {
    await this.props.onSaveListProduct(this.state.products);
    this.setState({
      products:[]
    })
  };

  render() {
    const keys = [
      "id", "productName", "virtue", "producer", "unit"
    ];
    return (
      <Card>
        <CardHeader>
          Nhập bằng CSV
          <div className="card-header-actions">
            <CsvParse
              keys={keys}
              onDataUploaded={this.handleForce}
              onError={this.handleError}
              render={onChange => (
                <div className="upload-btn-wrapper">
                  <button className="btn"><Icon type="upload"/></button>
                  <input type="file" name="file" onChange={onChange} accept={".csv"}/>
                </div>
              )}
            />
          </div>
        </CardHeader>
        <CardBody>
          <Table size={'small'} bordered={true} dataSource={this.state.products} rowKey={'id'}>
            <Table.Column
              key={'id'}
              dataIndex={'id'}
              title={'STT'}
            />
            <Table.Column
              key={'productName'}
              dataIndex={'productName'}
              title={'Tên sản phẩm'}
            />
            <Table.Column
              key={'virtue'}
              dataIndex={'virtue'}
              title={'Công dụng'}
            />
            <Table.Column
              key={'producer'}
              dataIndex={'producer'}
              title={'NSX'}
            />
            <Table.Column
              key={'unit'}
              dataIndex={'unit'}
              title={'Đơn vị chuẩn'}
            />
            <Table.Column
              key={'extends'}
              title={'Xóa'}
              render={(record) => <Button icon={'minus'} onClick={this.handleDeleteProduct.bind(this, record)}/>}
            />
          </Table>
        </CardBody>
        <CardFooter>
          <Button
            type="button"
            size="small"
            color="primary"
            onClick={this.handleSubmit.bind(this)}
            disabled={this.state.products.length === 0}>
            <i className="fa fa-dot-circle-o"/> Lưu</Button> {' '}
        </CardFooter>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = (dispatch) => ({
  onSaveListProduct: (data) => dispatch(saveListProduct(data))
});

export default connect(
  mapStateToProps,mapDispatchToProps
)(ImportProduct);
