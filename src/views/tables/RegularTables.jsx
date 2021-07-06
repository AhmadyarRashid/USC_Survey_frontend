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
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

// core components
import SortingTable from "components/SortingTable/SortingTable.jsx";

class RegularTables extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col className="mb-5" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">All Users</CardTitle>
                </CardHeader>
                <CardBody>
                  <SortingTable
                    thead={[
                      { text: "Name" },
                      { text: "Email" },
                      { text: "Head Office" },
                      { text: "Zones" },
                      { text: "Regions" },
                      { text: "Stores" },
                    ]}
                    tbody={[
                      {
                        data: [
                          { text: "Dakota Rice" },
                          { text: "Niger@gmail.com" },
                          { text: "1,2" },
                          { text: "1,2" },
                          { text: "1,2" },
                          { text: "1,2" },
                        ]
                      },
                      {
                        data: [
                          { text: "Minerva Hooper" },
                          { text: "Curaçao" },
                          { text: "1,2" },
                          { text: "1,2" },
                          { text: "1,2" },
                          { text: "1,2" },
                        ]
                      },
                      {
                        data: [
                          { text: "Sage Rodriguez" },
                          { text: "Netherlands" },
                          { text: "1,2" },
                          { text: "1,2" },
                          { text: "1,2" },
                          { text: "1,2" },
                        ]
                      },
                      {
                        data: [
                          { text: "Philip Chaney" },
                          { text: "Korea, South" },
                          { text: "1,2" },
                          { text: "1,2" },
                          { text: "1,2" },
                          { text: "1,2" },
                        ]
                      },
                      {
                        data: [
                          { text: "Doris Greene" },
                          { text: "Malawi" },
                          { text: "1,2" },
                          { text: "1,2" },
                          { text: "1,2" },
                          { text: "1,2" },
                        ]
                      },
                      {
                        data: [
                          { text: "Mason Porter" },
                          { text: "Chile" },
                          { text: "1,2" },
                          { text: "1,2" },
                          { text: "1,2" },
                          { text: "1,2" },
                        ]
                      },
                      {
                        data: [
                          { text: "Jon Porter" },
                          { text: "Portugal" },
                          { text: "1,2" },
                          { text: "1,2" },
                          { text: "1,2" },
                          { text: "1,2" },
                        ]
                      }
                    ]}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default RegularTables;
