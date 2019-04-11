import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input, Icon} from 'antd';
import {searchProductName} from '../../redux/action/searchProductNameAction'

class FormSearch extends Component {
  constructor(props){
    super(props);
    this.state= {
      isLoading: false,
      productName:  ''
    }
  }
  handlerChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
    this.props.onSearchProductName(value);
  }
  render() {
    return (
      <div>
        <Input
          placeholder="Nhập thuốc bạn cần tìm"
          onChange={this.handlerChange}
          name={'productName'}
          suffix={
            this.state.isLoading ? <Icon type="loading" /> : <Icon type="search" />}
        />
        <div className={'result-list'}>
          <div>thuoc tay</div>
          <div>thuoc tay</div>
          <div>thuoc tay</div>
          <div>thuoc tay</div>
          <div>thuoc tay</div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchProductName: (key) => dispatch(searchProductName(key))
  }
}
export default connect(
  mapStateToProps,mapDispatchToProps
)(FormSearch);