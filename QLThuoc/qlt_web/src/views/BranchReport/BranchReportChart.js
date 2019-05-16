import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Line} from "react-chartjs-2";
import {getStyle, hexToRgba} from "@coreui/coreui/dist/js/coreui-utilities";
import {CustomTooltips} from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import {Col} from 'reactstrap';
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import Row from "reactstrap/es/Row";
import CardTitle from "reactstrap/es/CardTitle";
import {getReportOfBranch} from '../../actions/branchAction';


const brandSuccess = getStyle('--success');
const brandInfo = getStyle('--info');
const brandDanger = getStyle('--danger');

let elements = 12;
let data1 = [];
let data2 = [];
let data3 = [];

for (let i = 0; i <= elements -1; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  // data3.push(65);
}

for (let i = 0; i <= elements - 1; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}


const mainChart = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  datasets: [
    {
      label: 'Bán hàng',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'Nhập Hàng',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    }
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return {backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor}
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


class BranchReportChart extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  componentWillMount() {
    this.props.onGetReportOfBranch();
  }


  render() {
    return (
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row>
                <Col sm="5">
                  <CardTitle className="mb-0">Thông kê</CardTitle>
                  <div className="small text-muted">Nhập xuất hàng</div>
                </Col>
              </Row>
              <div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
                <Line data={mainChart} options={mainChartOpts} height={300}/>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
const mapDispatchToProps =  (dispath) => ({
  onGetReportOfBranch: () => dispath(getReportOfBranch())
});
export default connect(
  mapStateToProps,mapDispatchToProps
)(BranchReportChart);
