import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader, Form} from "reactstrap";
import {Table} from "antd";

class SearchProduct extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardHeader><i className={'fa fa-search'}/> Tra cứu Sản Phẩm</CardHeader>
          <CardBody>
            <Form layout={'inline'}>
              <Form.Item label={'Đã xem'}>
                {/*<Switch checked={isSeen} onChange={this.handleToggle('isSeen')}/>*/}
              </Form.Item>
              <Form.Item label={'Đã Xác Nhận'}>
                {/*<Switch checked={isAccept} onChange={this.handleToggle('isAccept')}/>*/}
              </Form.Item>
              <Form.Item label={'Đã Nhận'}>
                {/*<Switch checked={isReceive} onChange={this.handleToggle('isReceive')}/>*/}
              </Form.Item>
              <Form.Item label={'Đã Hoàn Tất'}>
                {/*<Switch checked={isDone} onChange={this.handleToggle('isDone')}/>*/}
              </Form.Item>
              <Form.Item label={'Đã Hủy'}>
                {/*<Switch checked={isCancel} onChange={this.handleToggle('isCancel')} type="danger"/>*/}
              </Form.Item>
              {/*<Button htmlType={'button'} onClick={this.handleSearch} type="primary" icon="search">Tìm</Button>*/}
            </Form>
            <Table
              rowKey='id'
              bordered={true}
              // dataSource={billsRequest}
            >
              <Table.Column
                title={'Mã Yêu Cầu'}
                dataIndex={'id'}
                key={'id'}/>
              <Table.Column
                title={'Chi Nhánh Yêu Cầu'}
                dataIndex={'branch'}
                key={'branch'}/>
              {/*<Table.Column*/}
                {/*title={'Ngày Yêu Cầu'}*/}
                {/*dataIndex={'dateRequested'}*/}
                {/*key={'dateRequested'}*/}
                {/*render={(text) => (*/}
                  {/*(<Moment format="DD/MM/YYYY">{text}</Moment>)*/}
                {/*)}*/}
              {/*/>*/}
              <Table.Column
                title={'Ghi Chú Yêu Cầu'}
                dataIndex={'noteRequest'}
                key={'noteRequest'}
              />
              {/*<Table.Column*/}
                {/*title={'Hành Động'}*/}
                {/*dataIndex={'operation'}*/}
                {/*key={'operation'}*/}
                {/*render={(text, record) => (*/}
                  {/*billsRequest.length > 0 ? (*/}
                    {/*<span>*/}
                      {/*<Button htmlType='button' type="primary" icon={'info-circle'}*/}
                              {/*onClick={() => this.showDetail(text, record)} loading={flgLoadingShowDetail}/>*/}
                    {/*</span>*/}
                  {/*) : null*/}
                {/*)}*/}
              {/*/>*/}
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
)(SearchProduct);
