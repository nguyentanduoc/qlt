import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

export class FormBranch extends Component {

  render() {
    return (
      <Card>
        <CardHeader>
          <strong>Chi Nhánh</strong>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12">
              <FormGroup>
                <Label htmlFor="branchName">Tên Chi Nhánh</Label>
                <Input type="text" id="branchName" placeholder="Tên Chi Nhánh" required />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <FormGroup>
                <Label htmlFor="address ">Credit Card Number</Label>
                <Input type="textarea" id="address " placeholder="Địa chỉ" required />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="4">
              <FormGroup>
                <Label htmlFor="lon">Kinh Độ</Label>
                <Input type="text" name="lon" id="lon" disabled/>
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label htmlFor="lat">Vĩ Độ</Label>
                <Input type="text" name="lat" id="lat" disabled/>
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label htmlFor="cvv">Lấy Địa Chỉ</Label>
                <Button><i className="fas fa-map-marked-alt"></i></Button>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className='text-right'>
          <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
          <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
        </CardFooter>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBranch)
