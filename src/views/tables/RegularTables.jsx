import React from "react";

// reactstrap components
import {Card, CardHeader, CardBody, CardTitle, Row, Col} from "reactstrap";
import {getAllUsers} from "../../api/user"

// core components
import SortingTable from "components/SortingTable/SortingTable.jsx";
import {deleteUser} from "../../api/user"

class RegularTables extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    getAllUsers()
      .then(response => {
        if (response.isSuccess) {
          this.setState({
            users: response.payload
          })
        }
      })
  }

  deleteUserHandler = userId => {
    deleteUser(userId)
      .then(response => {
        if (response.isSuccess) {
          this.setState(preState => ({
            users: preState.users.filter(user => user.id !== userId)
          }))
        }
      })
  }

  updateUserHandler = userId => {
    this.props.history.push(`/admin/users/edit/${userId}`)
  }

  render() {
    const {users} = this.state;
    const tableBodyData = users.map(user => ({
      data: [
        {text: user.name},
        {text: user.phoneNo},
        {text: user.headOfficeIds},
        {text: user.zoneIds},
        {text: user.regionIds},
        {text: user.storeIds},
        {text: user.id},
      ]
    }))
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
                  {users.length > 0 ? <SortingTable
                    deleteUserHandler={this.deleteUserHandler}
                    updateUserHandler={this.updateUserHandler}
                    thead={[
                      {text: "Name"},
                      {text: "phone No"},
                      {text: "Head Office"},
                      {text: "Zones"},
                      {text: "Regions"},
                      {text: "Stores"},
                    ]}
                    tbody={tableBodyData}
                  /> : <h4 align="center">No User Available</h4>}
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
