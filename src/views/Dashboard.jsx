import React from "react";
import classNames from "classnames";
// react plugin used to create charts
import {Line, Bar} from "react-chartjs-2";
import {Link} from "react-router-dom"
// react plugin for creating vector maps
import {VectorMap} from "react-jvectormap";
import {getDashboardData} from "../api/user"

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Progress,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
const totalStores = 3688;

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      data: {
        completedStores: 0,
        totalUsers: 0,
        users: [],
        regionStores: []
      },
      errorMsg: ''
    };
  }

  componentDidMount() {
    getDashboardData()
      .then(response => {
        console.log("dashboard data", response)
        const {isSuccess, payload, message} = response
        if (isSuccess) {
          this.setState({
            data: payload,
            errorMsg: ''
          })
        } else {
          this.setState({
            errorMsg: message
          })
        }
      })
      .catch(error => {
        console.log("dashboard error", error)
      })
  }

  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };

  render() {
    const {data: {completedStores = 0, totalUsers = 0, users = [], regionStores = []}} = this.state;
    return (
      <React.Fragment>
        <div className="content">
          <Row>
            {/*<Col xs="12">*/}
            {/*  <Card className="card-chart">*/}
            {/*    <CardHeader>*/}
            {/*      <Row>*/}
            {/*        <Col className="text-left" sm="6">*/}
            {/*          <h5 className="card-category">Total Installation</h5>*/}
            {/*          <CardTitle tag="h2">Installation</CardTitle>*/}
            {/*        </Col>*/}
            {/*      </Row>*/}
            {/*    </CardHeader>*/}
            {/*    <CardBody>*/}
            {/*      <div className="chart-area">*/}
            {/*        <Line*/}
            {/*          data={chartExample1[this.state.bigChartData]}*/}
            {/*          options={chartExample1.options}*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*    </CardBody>*/}
            {/*  </Card>*/}
            {/*</Col>*/}
            <Col lg="3" md="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col xs="5">
                      <div className="info-icon text-center icon-primary">
                        <i className="tim-icons icon-cart"/>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Stores</p>
                        <CardTitle tag="h3">{totalStores}</CardTitle>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col xs="5">
                      <div className="info-icon text-center icon-success">
                        <i className="tim-icons icon-cart"/>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Complete Store Installation</p>
                        <CardTitle tag="h3">{completedStores}</CardTitle>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col xs="5">
                      <div className="info-icon text-center icon-danger">
                        <i className="tim-icons icon-cart"/>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Not Completed Stores</p>
                        <CardTitle tag="h3">{totalStores - completedStores}</CardTitle>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col xs="5">
                      <div className="info-icon text-center icon-success">
                        <i className="tim-icons icon-single-02"/>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Users</p>
                        <CardTitle tag="h3">{totalUsers}</CardTitle>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Users</CardTitle>
                </CardHeader>
                <CardBody>
                  {users.length > 0 ? <Table responsive>
                    <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Name</th>
                      <th>Phone No</th>
                      <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                      <tr>
                        <td className="text-center">
                          {index + 1}
                        </td>
                        <td>{user.name}</td>
                        <td>{user.phoneNo}</td>
                        <td>{user.address}</td>
                      </tr>
                    ))}
                    </tbody>
                  </Table> : <p className="text-center">No User Found</p>}

                  <p align="right"><Link to="/admin/users">see more >></Link></p>
                </CardBody>
              </Card>
            </Col>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Complete Installation by Region</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <Table responsive>
                        <thead className="text-primary">
                        <tr>
                          <th className="text-center">#</th>
                          <th>Name</th>
                          <th className="text-right">Completed Stores</th>
                        </tr>
                        </thead>
                        <tbody>
                        {regionStores.length > 0 ? regionStores.map(({name = '', storeCount = 0}, index) => (
                          <tr>
                            <td className="text-center">{index + 1}</td>
                            <td>{name}</td>
                            <td className="text-right">{storeCount}</td>
                          </tr>
                        )) : <tr>
                          <td/>
                          <td className="text-center">No Store Completed in Any Region</td>
                          <td/>
                        </tr>}
                        </tbody>
                      </Table>
                    </Col>
                    <Col className="ml-auto mr-auto" md="6">
                      <VectorMap
                        map={"asia_mill"}
                        backgroundColor="transparent"
                        zoomOnScroll={false}
                        containerStyle={{
                          width: "100%",
                          height: "300px"
                        }}
                        regionStyle={{
                          initial: {
                            fill: "#e4e4e4",
                            "fill-opacity": 0.9,
                            stroke: "none",
                            "stroke-width": 0,
                            "stroke-opacity": 0
                          }
                        }}
                        series={{
                          regions: [
                            {
                              values: mapData,
                              scale: ["#AAAAAA", "#444444"],
                              normalizeFunction: "polynomial"
                            }
                          ]
                        }}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
