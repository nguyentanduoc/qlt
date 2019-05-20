import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteBranch, search, select, setBranch} from '../../actions/branchAction'
import FormBranch from './FormBranch'
import {Table} from 'antd'
import PaginationCommon from '../Common/PaginationCommon'
import {Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Row} from 'reactstrap'

const columns = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
  },
  {
    key: 'name',
    title: 'Tên Chi Nhánh',
    dataIndex: 'name',
  },
  {
    key: 'isEnabled',
    title: 'Hoạt động',
    dataIndex: 'isEnabled',
    render: value => (
      <Badge color={value ? 'success' : 'danger'}>{value ? 'Hoạt động' : 'Dừng hoạt động'}</Badge>
    )
  },
  {
    key: 'isMain',
    title: 'Chi Nhánh Chính',
    dataIndex: 'isMain',
    render: value => (
      <Badge className="align-items-center" color={value ? 'success' : 'secondary'}>
        <i className="fas fa-home"/></Badge>
    )
  },
];

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seletedKeys: [],
      condition: '',
      idDirector: this.props.authReducer.user.id
    }

  }

  componentWillMount() {
    this.props.onSelect();
  }

  onSelectedRowKeysChange = (keys) => {
    this.setState({seletedKeys: keys});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSelect(this.state.condition);
  };

  handleDeletedRow = async (e) => {
    e.preventDefault();
    await this.props.onDeleteBranch(this.state.seletedKeys);
    this.props.onSelect(this.state.condition);
  };

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };
  search = () => {
    this.props.onSearch(this.state.condition);
  };

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys) => {
        this.onSelectedRowKeysChange(selectedRowKeys);
      }
    };
    const onRow = (record) => {
      return {
        onClick: (event) => {
          event.preventDefault();
          this.props.onSetBranch(record);
        }
      };
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <i className="fas fa-list-alt"/> Danh Sách <strong>Chi Nhánh</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit.bind(this)} className='form-inline justify-content-end pb-2'>
                  {/*<InputGroup className="float-right">*/}
                  {/*  <Input type="text" id="condition" name="condition" placeholder="Tên Chi Nhánh"*/}
                  {/*         onChange={this.changeHandler.bind(this)}/>*/}
                  {/*  <InputGroupAddon addonType="append">*/}
                  {/*    <Button type="submit" color="primary" className="btn-square" onClick={this.search}>*/}
                  {/*      <i className="fas fa-search"/>*/}
                  {/*    </Button>*/}
                  {/*  </InputGroupAddon>*/}
                  {/*</InputGroup>*/}
                  <Button color='warning' className="btn-square ml-1" disabled={this.state.seletedKeys.length <= 0}
                          onClick={this.handleDeletedRow.bind(this)}>
                    <i className="far fa-trash-alt"/>
                  </Button>
                </Form>
                <Table
                  rowKey='id'
                  columns={columns}
                  dataSource={this.props.branchReducer.branchs}
                  rowSelection={rowSelection}
                  onRow={onRow}
                  bordered={true}
                  size={"small"}
                />
              </CardBody>
            </Card>
          </Col>
          <Col>
            <FormBranch/>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  branchReducer: state.branchReducer,
  authReducer: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  onSelect: () => {
    return dispatch(select())
  },
  onSetBranch: (branch) => {
    return dispatch(setBranch(branch));
  },
  onDeleteBranch: (keys) => {
    return dispatch(deleteBranch(keys));
  },
  onSearch: (data) => {
    return dispatch(search(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(index)
