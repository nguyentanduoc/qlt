import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input, Icon, List} from 'antd';
import {searchProductName, searchProductOfBranch, setBranchSelected} from '../../redux/action/searchProductNameAction';
import {setCurrentCoordinate} from '../../redux/action/mapAction';

class FormSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      productName: ''
    }
  }

  handlerChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
    this.props.onSearchProductName(value);
  };
  handleClickItemList = (row) => {
    this.props.onSearchProductOfBranch({
      product: row,
      coordinate: {
        latitude: this.props.mapReducer.currentCoordinate.latitude,
        longitude: this.props.mapReducer.currentCoordinate.longitude
      }
    });
  };

  static gotoMap(record) {
    this.props.history.push('/map/');
    this.props.onSetBranchSelected(record);
  }

  render() {
    const {productNames, branches} = this.props.searchProductNameReducer;
    return (
      <div>
        <Input
          autoComplete="false"
          placeholder="Nhập thuốc bạn cần tìm"
          onChange={this.handlerChange}
          name={'productName'}
          suffix={this.state.isLoading ? <Icon type="loading"/> : <Icon type="search"/>}/>
        <div className={'result-list'}
             style={{display: this.state.productName === '' || branches.length > 0 ? 'none' : 'block'}}>
          {
            productNames.length > 0 && productNames.map((row, index) => (
              <div key={index} onClick={this.handleClickItemList.bind(this, row)}>{row.label}</div>
            ))
          }
        </div>
        <div style={{display: branches.length < 0 ? 'none' : 'block'}}>
          {branches.length > 0 &&
          (<List
            itemLayout="horizontal"
            dataSource={branches}
            renderItem={item => (
              <List.Item
                onClick={FormSearch.gotoMap.bind(this, item)}
                actions={[<div>{item.distance}{' km '}<i className="fas fa-motorcycle"/></div>]}>
                <List.Item.Meta
                  title={item.shop.nameShop}
                  description={'Chi Nhánh: ' + item.name}
                />
                Địa chỉ: {item.address}
              </List.Item>
            )}
          />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchProductNameReducer: state.searchProductNameReducer,
  mapReducer: state.mapReducer
});
const mapDispatchToProps = (dispatch) => ({
  onSearchProductName: (key) => dispatch(searchProductName(key)),
  onSearchProductOfBranch: (productAndLocation) => dispatch(searchProductOfBranch(productAndLocation)),
  onSetCurrentCoordinate: (coordinate) => dispatch(setCurrentCoordinate(coordinate)),
  onSetBranchSelected: (branch) => dispatch(setBranchSelected(branch))
});
export default connect(
  mapStateToProps, mapDispatchToProps
)(FormSearch);