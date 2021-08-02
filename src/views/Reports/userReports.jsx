import React, {Component} from "react"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
  Pagination, PaginationItem, PaginationLink, FormGroup, Label, Input
} from "reactstrap";
import {getUserReports, getAllUsers} from "../../api/area"

class UserReportsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      startPage: 0,
      endPage: 5,
      currentPage: 0,
      users: []
    }
  }

  componentDidMount() {
    getUserReports()
      .then(response => {
        const {payload} = response
        this.setState({
          data: payload,
          endPage: Math.round(payload.length / 10)
        })
      })
      .catch(error => {
        console.log("error:", error)
      })

    getAllUsers()
      .then(response => {
        const {payload} = response
        this.setState({
          users: payload
        })
      })
  }

  renderPagination = () => {
    const {startPage, currentPage, endPage} = this.state;

    return (
      <Pagination style={{float: 'right'}}>
        {startPage > 0 && <PaginationItem onClick={() => {
          this.setState(prevState => ({
            startPage: Number(prevState.startPage - 1)
          }))
        }}>
          <PaginationLink first/>
        </PaginationItem>}
        {[0,1,2,3,4,5,6,7,8,9].map(item => (
          <PaginationItem onClick={() => {
            this.setState({
              currentPage: Number(startPage*10 +item),
            })
          }}>
            <PaginationLink>
              {Number(startPage*10 +item) + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {endPage > startPage+5 &&  <PaginationItem onClick={() => {
          this.setState(prevState => ({
            startPage: Number(prevState.startPage + 1)
          }))
        }}>
          <PaginationLink last/>
        </PaginationItem>}
      </Pagination>
    )
  }

  onSelectUserHandler = (userId) => {
    getUserReports(userId)
      .then(response => {
        const {payload} = response
        this.setState({
          data: payload,
          endPage: Math.round(payload.length / 10),
          startPage: 0,
          currentPage: 0,
        })
      })
      .catch(error => {
        console.log("error:", error)
      })
  }

  render() {
    const {data, startPage, currentPage, users} = this.state;
    return (
      <React.Fragment>
        <div className="content">
          <Row>
            <Col className="mb-5" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Users Reports</CardTitle>
                </CardHeader>
                <CardBody>
                  {users.length > 0 && (
                    <FormGroup style={{marginBottom: 18, width: "40%"}}>
                      <Label for="exampleSelect">Select Users</Label>
                      <Input type="select" onChange={(event) => {
                        console.log("select change", event.target.value)
                        this.onSelectUserHandler(event.target.value)
                      }} name="select" id="userSelect">
                        <option value={-1}>All</option>
                        {users.map(item => <option value={item.id}>{item.name}</option>)}
                      </Input>
                    </FormGroup>
                  )}
                  <Table responsive>
                    <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Store Name</th>
                      <th>User Name</th>
                      <th>Company</th>
                      <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.slice(currentPage*10, currentPage*10+10).map((item, index) => (
                      <tr>
                        <td className="text-center">
                          {Number(currentPage*10 + (index + 1))}
                        </td>
                        <td>{item.name}</td>
                        <td>{item.userName}</td>
                        <td>{item.company}</td>
                        <td>
                          <span style={{
                            alignItems: 'center',
                            backgroundColor: item.isCompleted === "true" ? "lightgreen" : "#FFCCCB",
                            padding: 8,
                            borderRadius: 4
                          }}>
                            {item.isCompleted === "true" ? "Completed" : "Not Completed"}
                          </span>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </Table>
                  {this.renderPagination()}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}

export default UserReportsPage;
