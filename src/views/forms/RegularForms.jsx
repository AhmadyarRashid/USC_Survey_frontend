/*!

=========================================================
* Black Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  Row,
  Col, Alert
} from "reactstrap";
import ReactDatetime from "react-datetime";
import Multiselect from 'multiselect-react-dropdown';

const HeadOffice = [
  {
    cat: 'Group 1',
    key: 'Head Office 1'
  },
  {
    cat: 'Group 2',
    key: 'Head Office 2'
  },
];

const zones = [
  {
    cat: 'Group 1',
    key: 'Zone 1'
  },
  {
    cat: 'Group 2',
    key: 'Zone 2'
  },
  {
    cat: 'Group 2',
    key: 'Zone 3'
  },
  {
    cat: 'Group 2',
    key: 'Zone 4'
  },
];

const regions = [
  {
    cat: 'Group 1',
    key: 'Region 1'
  },
  {
    cat: 'Group 2',
    key: 'Region 2'
  },
  {
    cat: 'Group 2',
    key: 'Region 3'
  },
  {
    cat: 'Group 2',
    key: 'Region 4'
  },
];

const options = [
  {
    cat: 'Group 1',
    key: 'Option 1'
  },
  {
    cat: 'Group 1',
    key: 'Option 2'
  },
  {
    cat: 'Group 1',
    key: 'Option 3'
  },
  {
    cat: 'Group 2',
    key: 'Option 4'
  },
  {
    cat: 'Group 2',
    key: 'Option 5'
  },
  {
    cat: 'Group 2',
    key: 'Option 6'
  },
  {
    cat: 'Group 2',
    key: 'Option 7'
  }
]

class RegularForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      dob: '',
      address: '',
      password: '',
      retypePassword: '',
      errorMsg: '',
      isLoading: false,
      hasError: false,
    }
  }

  onInputChangeHandler = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  onResetHandler = () => {
    this.setState({
      username: '',
      email: '',
      dob: '',
      address: '',
      password: '',
      retypePassword: ''
    })
  }

  onSaveCustomerHandler = () => {
    const {password, retypePassword} = this.state;
    this.setState({
      isLoading: true,
      hasError: false,
      errorMsg: ""
    })

    setTimeout(() => {
      if (password !== retypePassword) {
        this.setState({
          hasError: true,
          isLoading: false,
          errorMsg: "Both password field are mis-matched"
        })
      } else {
        this.setState({
          isLoading: false,
          hasError: false,
          errorMsg: ""
        })
      }
    }, 2000)
  }

  render() {
    const {hasError, isLoading, errorMsg} = this.state
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Create New User</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal">
                    {hasError && <Alert color="danger">{errorMsg}</Alert>}
                    <Row>
                      <Label sm="2">Username</Label>
                      <Col sm="10">
                        <FormGroup>
                          <Input
                            type="text"
                            onChange={e => this.onInputChangeHandler("username", e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="2">Email</Label>
                      <Col sm="10">
                        <FormGroup>
                          <Input
                            type="text"
                            onChange={e => this.onInputChangeHandler("email", e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="2">Date Of Birth</Label>
                      <Col className="checkbox-radios" sm="10">
                        <FormGroup>
                          <ReactDatetime
                            inputProps={{
                              className: "form-control",
                              placeholder: "Date Picker Here"
                            }}
                            timeFormat={false}
                            onChange={e => this.onInputChangeHandler("dob", e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="2">Address</Label>
                      <Col sm="10">
                        <FormGroup>
                          <Input
                            type="text"
                            autoComplete="off"
                            onChange={e => this.onInputChangeHandler("address", e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="2">Head Office</Label>
                      <Col sm="10">
                        <FormGroup>
                          <Multiselect
                            displayValue="key"
                            onRemove={function noRefCheck(){}}
                            onSelect={function noRefCheck(){}}
                            options={HeadOffice}
                            showCheckbox
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="2">Zones</Label>
                      <Col sm="10">
                        <FormGroup>
                          <Multiselect
                            displayValue="key"
                            onRemove={function noRefCheck(){}}
                            onSelect={function noRefCheck(){}}
                            options={zones}
                            showCheckbox
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="2">Regions</Label>
                      <Col sm="10">
                        <FormGroup>
                          <Multiselect
                            displayValue="key"
                            onRemove={function noRefCheck(){}}
                            onSelect={function noRefCheck(){}}
                            options={regions}
                            showCheckbox
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="2">Stores</Label>
                      <Col sm="10">
                        <FormGroup>
                          <Multiselect
                            displayValue="key"
                            onRemove={function noRefCheck(){}}
                            onSelect={function noRefCheck(){}}
                            options={options}
                            showCheckbox
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="2">Password</Label>
                      <Col sm="10">
                        <FormGroup>
                          <Input
                            type="password"
                            autoComplete="off"
                            onChange={e => this.onInputChangeHandler("password", e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="2">Password</Label>
                      <Col sm="10">
                        <FormGroup>
                          <Input
                            type="password"
                            autoComplete="off"
                            onChange={e => this.onInputChangeHandler("retypePassword", e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" onClick={() => this.onSaveCustomerHandler()}>
                    {isLoading ? 'Loading...': 'Create'}
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default RegularForms;
