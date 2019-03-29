import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  CustomInput
  } from 'reactstrap'
import {deleteMultible} from '../../../actions/appSettingAction'

class TabSetting extends Component {

  changeHandler = (event) => {
    const name = event.target.name;
    switch (name) {
      case 'flgDeleteMultible':
        this.props.onDeleteMultiple();
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div>
        <h6>Cài đặt</h6>
            <div className="aside-options">
              <div className="clearfix mt-4">
                <small><b>Xóa nhiều</b></small>
                  <CustomInput
                    className={'float-right'} 
                    type="switch"
                    id='flgDeleteMultible'
                    name='flgDeleteMultible'
                    checked={this.props.appSettingReducer.flgDeleteMultiple}
                    onChange={this.changeHandler.bind(this)}
                    value = {this.props.appSettingReducer.flgDeleteMultiple} 
                    />
              </div>
              <div>
                <small className="text-muted">
                  Tùy chọn xóa nhiều trong mỗi bản
                </small>
              </div>
            </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  appSettingReducer: state.appSettingReducer
})

const mapDispatchToProps = (dispatch) => ({
  onDeleteMultiple: () => {
    return dispatch(deleteMultible());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TabSetting)
