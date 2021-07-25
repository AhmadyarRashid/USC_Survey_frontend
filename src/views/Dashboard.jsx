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
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import {Line, Bar} from "react-chartjs-2";
// react plugin for creating vector maps
import {VectorMap} from "react-jvectormap";

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

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.jsx";

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
      bigChartData: "data1"
    };
  }

  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Total Installation</h5>
                      <CardTitle tag="h2">Installation</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample1[this.state.bigChartData]}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col xs="5">
                      <div className="info-icon text-center icon-warning">
                        <i className="tim-icons icon-chat-33"/>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Stores</p>
                        <CardTitle tag="h3">1500</CardTitle>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr/>
                  <div className="stats">
                    <i className="tim-icons icon-refresh-01"/> Update Now
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col xs="5">
                      <div className="info-icon text-center icon-primary">
                        <i className="tim-icons icon-shape-star"/>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Complete Store Installation</p>
                        <CardTitle tag="h3">35+</CardTitle>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr/>
                  <div className="stats">
                    <i className="tim-icons icon-sound-wave"/> Last Research
                  </div>
                </CardFooter>
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
                        <p className="card-category">Users</p>
                        <CardTitle tag="h3">120</CardTitle>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr/>
                  <div className="stats">
                    <i className="tim-icons icon-trophy"/> Customers feedback
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col xs="5">
                      <div className="info-icon text-center icon-danger">
                        <i className="tim-icons icon-molecule-40"/>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Reports</p>
                        <CardTitle tag="h3">12</CardTitle>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr/>
                  <div className="stats">
                    <i className="tim-icons icon-watch-time"/> In the last
                    hours
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <div className="tools float-right">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        caret
                        className="btn-icon"
                        color="link"
                        data-toggle="dropdown"
                        type="button"
                      >
                        <i className="tim-icons icon-settings-gear-63"/>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          Action
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          Another action
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          Something else
                        </DropdownItem>
                        <DropdownItem
                          className="text-danger"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          Remove Data
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <CardTitle tag="h5">Users</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Name</th>
                      <th>Region</th>
                      <th>Milestone</th>
                      <th className="text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td className="text-center">
                        1
                      </td>
                      <td>Tania Mike</td>
                      <td>Islamabad</td>
                      <td className="text-center">
                        <div className="progress-container progress-sm">
                          <Progress multi>
                            <span className="progress-value">25%</span>
                            <Progress bar max="100" value="25"/>
                          </Progress>
                        </div>
                      </td>
                      <td className="text-right">
                        <Button
                          className="btn-link btn-icon btn-neutral"
                          color="success"
                          id="tooltip618296632"
                          size="sm"
                          title="Refresh"
                          type="button"
                        >
                          <i className="tim-icons icon-refresh-01"/>
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip618296632"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                        <Button
                          className="btn-link btn-icon btn-neutral"
                          color="danger"
                          id="tooltip707467505"
                          size="sm"
                          title="Delete"
                          type="button"
                        >
                          <i className="tim-icons icon-simple-remove"/>
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip707467505"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">2</td>
                      <td>John Doe</td>
                      <td>Lahore</td>
                      <td className="text-center">
                        <div className="progress-container progress-sm">
                          <Progress multi>
                            <span className="progress-value">77%</span>
                            <Progress bar max="100" value="77"/>
                          </Progress>
                        </div>
                      </td>
                      <td className="text-right">
                        <Button
                          className="btn-link btn-icon btn-neutral"
                          color="success"
                          id="tooltip216846074"
                          size="sm"
                          title="Refresh"
                          type="button"
                        >
                          <i className="tim-icons icon-refresh-01"/>
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip216846074"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                        <Button
                          className="btn-link btn-icon btn-neutral"
                          color="danger"
                          id="tooltip391990405"
                          size="sm"
                          title="Delete"
                          type="button"
                        >
                          <i className="tim-icons icon-simple-remove"/>
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip391990405"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">3</td>
                      <td>Alexa Mike</td>
                      <td>Bahawalpur</td>
                      <td className="text-center">
                        <div className="progress-container progress-sm">
                          <Progress multi>
                            <span className="progress-value">41%</span>
                            <Progress bar max="100" value="41"/>
                          </Progress>
                        </div>
                      </td>
                      <td className="text-right">
                        <Button
                          className="btn-link btn-icon btn-neutral"
                          color="success"
                          id="tooltip191500186"
                          size="sm"
                          title="Refresh"
                          type="button"
                        >
                          <i className="tim-icons icon-refresh-01"/>
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip191500186"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                        <Button
                          className="btn-link btn-icon btn-neutral"
                          color="danger"
                          id="tooltip320351170"
                          size="sm"
                          title="Delete"
                          type="button"
                        >
                          <i className="tim-icons icon-simple-remove"/>
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip320351170"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">4</td>
                      <td>Jana Monday</td>
                      <td>Swabi</td>
                      <td className="text-center">
                        <div className="progress-container progress-sm">
                          <Progress multi>
                            <span className="progress-value">50%</span>
                            <Progress bar max="100" value="50"/>
                          </Progress>
                        </div>
                      </td>
                      <td className="text-right">
                        <Button
                          className="btn-link btn-icon"
                          color="success"
                          id="tooltip345411997"
                          size="sm"
                          title="Refresh"
                          type="button"
                        >
                          <i className="tim-icons icon-refresh-01"/>
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip345411997"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                        <Button
                          className="btn-link btn-icon"
                          color="danger"
                          id="tooltip601343171"
                          size="sm"
                          title="Delete"
                          type="button"
                        >
                          <i className="tim-icons icon-simple-remove"/>
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip601343171"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                      </td>
                    </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Installation by Zones</CardTitle>
                  <p className="card-category">
                    All products that were shipped
                  </p>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <Table responsive>
                        <tbody>
                        <tr>
                          <td>1</td>
                          <td>Abbotabad</td>
                          <td className="text-right">2.920</td>
                          <td className="text-right">53.23%</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Quetta</td>
                          <td className="text-right">1.300</td>
                          <td className="text-right">20.43%</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Multan</td>
                          <td className="text-right">760</td>
                          <td className="text-right">10.35%</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Karachi</td>
                          <td className="text-right">690</td>
                          <td className="text-right">7.87%</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>Peshawar</td>
                          <td className="text-right">600</td>
                          <td className="text-right">5.94%</td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>Sukkar</td>
                          <td className="text-right">550</td>
                          <td className="text-right">4.34%</td>
                        </tr>
                        </tbody>
                      </Table>
                    </Col>
                    <Col className="ml-auto mr-auto" md="6">
                      <VectorMap
                        map={"world_mill"}
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
      </>
    );
  }
}

export default Dashboard;
