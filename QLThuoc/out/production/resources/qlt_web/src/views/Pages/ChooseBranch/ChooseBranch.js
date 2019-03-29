import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Row, FormGroup, Label, Input } from 'reactstrap'
import _ from 'lodash'
import { setBranch } from '../../../actions/authenAction';

class ChooseBranch extends Component {

  constructor(props){
    super(props);
    this.state = {
      branch: ''
    }
  }
  changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
          [name]: value
    });
  }
  componentWillMount(){
    if(this.props.auth.isLogin === false) {
      this.props.history.push('/login');
    }
  }
  continue(e){
    e.preventDefault();
    const stateBranch = this.state.branch;
    const branchs = this.props.auth.branchs;
    const branch = _.find(branchs, (o) => { return  parseInt(o.id) === parseInt(stateBranch); });
    this.props.onSetBranch(branch);
    this.props.history.push('/dashboard');
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Chọn Chi Nhánh</h1>
                      <FormGroup row>
                        <Col md="4"><Label>Chi Nhánh</Label></Col>
                        <Col md="8" xs="12">
                              {this.props.auth.branchs.map(branch => (
                                <FormGroup check key={branch.id}>
                                  <Label check>
                                    <Input type="radio" name="branch" value={branch.id} onChange={this.changeHandler.bind(this)}/>{' '}
                                    {branch.name}
                                  </Label>
                                </FormGroup>
                              ))}
                        </Col>
                    </FormGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" type="submit" onClick={this.continue.bind(this)}>Tiếp tục </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    auth : state.auth
})

const mapDispatchToProps = (dispatch) => ({
  onSetBranch: (branch) => {
    return dispatch(setBranch(branch));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChooseBranch)
