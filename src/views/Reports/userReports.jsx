import React, {Component} from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
  Pagination, PaginationItem, PaginationLink, FormGroup, Label, Input
} from "reactstrap";
import {getUserReports, getAllUsers, unlockUserStore} from "../../api/area"
import Swal from 'sweetalert2'
import {statusColor} from "../../utils/constants";
import {Link} from "react-router-dom";
import ExportReports from "./exportReports";

let allStores = []

class UserReportsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      startPage: 0,
      endPage: 5,
      currentPage: 0,
      users: [],
      exportState: 'all'
    }
  }

  componentDidMount() {
    getUserReports()
      .then(response => {
        const {payload} = response
        allStores = payload
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
        const templateRegionData = payload.map(item => ({
          cat: '1',
          name: item.name,
          id: item.id,
        }))
        const sortedUserList = templateRegionData.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        })
        this.setState({
          users: sortedUserList
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
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
          <PaginationItem onClick={() => {
            this.setState({
              currentPage: Number(startPage * 10 + item),
            })
          }}>
            <PaginationLink>
              {Number(startPage * 10 + item) + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {endPage > startPage + 5 && <PaginationItem onClick={() => {
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
        allStores = payload
        this.setState({
          data: payload,
          endPage: Math.round(payload.length / 10),
          startPage: 0,
          currentPage: 0,
          exportState: 'all'
        })
      })
      .catch(error => {
        console.log("error:", error)
      })
  }

  onCategoryChangeHandler = category => {
    let filteredData = []
    if (category === 'all') {
      filteredData = allStores
    } else if (category === 'pending') {
      filteredData = allStores.filter(
        ({erpStatus, nrtcStatus, ptclStatus, ...store}) =>
          erpStatus === null || ptclStatus === null ||
          nrtcStatus === null || erpStatus === 'pending' || ptclStatus === 'pending' ||
          nrtcStatus === 'pending'
      )
    } else if (category === 'completed') {
      filteredData = allStores.filter(
        ({erpStatus, nrtcStatus, ptclStatus, ...store}) =>
          erpStatus === 'completed' && ptclStatus === 'completed' && nrtcStatus === 'completed'
      )
    } else if (category === 'notCompleted') {
      filteredData = allStores.filter(
        ({erpStatus, nrtcStatus, ptclStatus, ...store}) =>
          erpStatus === 'notCompleted' || ptclStatus === 'notCompleted' ||
          nrtcStatus === 'notCompleted' || erpStatus === null || ptclStatus === null ||
          nrtcStatus === null || erpStatus === 'pending' || ptclStatus === 'pending' ||
          nrtcStatus === 'pending'
      )
    }

    this.setState({
      data: filteredData,
      exportState: category
    })
  }

  render() {
    const {data, startPage, currentPage, users, exportState} = this.state;

    // PTCL summary calculation
    const ptclPending = data.filter(item => !item.ptclStatus || item.ptclStatus === 'pending');
    const ptclCompleted = data.filter(item => item.ptclStatus === 'completed');
    const ptclNotCompleted = data.filter(item => item.ptclStatus === 'notCompleted');

    // ERP summary calculation
    const erpPending = data.filter(item => !item.erpStatus || item.erpStatus === 'pending');
    const erpCompleted = data.filter(item => item.erpStatus === 'completed');
    const erpNotCompleted = data.filter(item => item.erpStatus === 'notCompleted');

    // NRTC summary calculation
    const nrtcPending = data.filter(item => !item.nrtcStatus || item.nrtcStatus === 'pending');
    const nrtcCompleted = data.filter(item => item.nrtcStatus === 'completed');
    const nrtcNotCompleted = data.filter(item => item.nrtcStatus === 'notCompleted');

    return (
      <div className="content">
        <Row>
          <Col className="mb-5" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Users Reports</CardTitle>
              </CardHeader>
              <CardBody>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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

                  <FormGroup style={{
                    marginBottom: 18,
                    width: "40%",
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Label for="exampleSelect" style={{marginRight: 8}}>Category</Label>
                    <Input type="select" value={exportState} onChange={event => {
                      this.onCategoryChangeHandler(event.target.value)
                    }} name="select" id="exampleSelect">
                      <option value='all'>All</option>
                      <option value='pending'>Pending</option>
                      <option value='completed'>Completed</option>
                      <option value='notCompleted'>Not Completed</option>
                    </Input>

                    <ExportReports
                      reportStatus={exportState}
                      data={data}
                    />
                  </FormGroup>
                </div>
                <h3>Summary</h3>
                <Table responsive>
                  <thead className="text-primary">
                  <tr>
                    <th className="text-center">#</th>
                    <th>Pending</th>
                    <th>Completed</th>
                    <th>Not Completed</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center"><b>PTCL</b></td>
                      <td>{ptclPending.length}</td>
                      <td>{ptclCompleted.length}</td>
                      <td>{ptclNotCompleted.length}</td>
                    </tr>
                    <tr>
                      <td className="text-center"><b>ERP</b></td>
                      <td>{erpPending.length}</td>
                      <td>{erpCompleted.length}</td>
                      <td>{erpNotCompleted.length}</td>
                    </tr>
                    <tr>
                      <td className="text-center"><b>NRTC</b></td>
                      <td>{nrtcPending.length}</td>
                      <td>{nrtcCompleted.length}</td>
                      <td>{nrtcNotCompleted.length}</td>
                    </tr>
                  </tbody>
                </Table>
                <h3>Details</h3>
                <Table responsive>
                  <thead className="text-primary">
                  <tr>
                    <th className="text-center">#</th>
                    <th>Store Name</th>
                    <th>User Name</th>
                    <th>PTCL Status</th>
                    <th>ERP Status</th>
                    <th>NRTC Status</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {data.slice(currentPage * 10, currentPage * 10 + 10).map((item, index) => (
                    <tr>
                      <td className="text-center">
                        {Number(currentPage * 10 + (index + 1))}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.userName}</td>
                      <td>
                          <span
                            onClick={() => {
                              const {ptclStatus} = item;
                              if (ptclStatus && (ptclStatus === "notCompleted" || ptclStatus === "completed")) {
                                Swal.fire({
                                  title: 'Are you sure to unlock it ?',
                                  showCancelButton: true,
                                  cancelButtonText: 'No',
                                  confirmButtonText: `Yes`,
                                  denyButtonText: `Don't save`,
                                }).then((result) => {
                                  /* Read more about isConfirmed, isDenied below */
                                  if (result.isConfirmed) {
                                    const {storeId, userId} = item;
                                    unlockUserStore(storeId, userId, "ptcl")
                                      .then(() => {
                                        Swal.fire('Updated Successfully!', '', 'success')
                                        getUserReports()
                                          .then(response => {
                                            const {payload} = response
                                            this.setState({
                                              data: payload,
                                              endPage: Math.round(payload.length / 10),
                                              exportState: 'all',
                                            })
                                          })
                                          .catch(error => {
                                            console.log("error:", error)
                                          })
                                      }).catch(error => {
                                      Swal.fire('Something went wrong', '', 'error')
                                    })
                                  }
                                })
                              }
                            }}
                            style={{
                              alignItems: 'center',
                              backgroundColor: statusColor[!item.ptclStatus ? "pending" : item.ptclStatus],
                              padding: 8,
                              borderRadius: 4,
                              cursor: "pointer"
                            }}>
                            {!item.ptclStatus ? "pending" : item.ptclStatus}
                          </span>
                      </td>
                      <td>
                          <span
                            onClick={() => {
                              const {erpStatus} = item;
                              if (erpStatus && (erpStatus === "notCompleted" || erpStatus === "completed")) {
                                Swal.fire({
                                  title: 'Are you sure to unlock it ?',
                                  showCancelButton: true,
                                  cancelButtonText: 'No',
                                  confirmButtonText: `Yes`,
                                  denyButtonText: `Don't save`,
                                }).then((result) => {
                                  /* Read more about isConfirmed, isDenied below */
                                  if (result.isConfirmed) {
                                    const {storeId, userId} = item;
                                    unlockUserStore(storeId, userId, "erp")
                                      .then(() => {
                                        Swal.fire('Updated Successfully!', '', 'success')
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
                                      }).catch(error => {
                                      Swal.fire('Something went wrong', '', 'error')
                                    })
                                  }
                                })
                              }
                            }}
                            style={{
                              alignItems: 'center',
                              backgroundColor: statusColor[!item.erpStatus ? "pending" : item.erpStatus],
                              padding: 8,
                              borderRadius: 4,
                              cursor: "pointer"
                            }}>
                            {!item.erpStatus ? "pending" : item.erpStatus}
                          </span>
                      </td>
                      <td>
                          <span
                            onClick={() => {
                              const {nrtcStatus} = item;
                              if (nrtcStatus && (nrtcStatus === "notCompleted" || nrtcStatus === "completed")) {
                                Swal.fire({
                                  title: 'Are you sure to unlock it ?',
                                  showCancelButton: true,
                                  cancelButtonText: 'No',
                                  confirmButtonText: `Yes`,
                                  denyButtonText: `Don't save`,
                                }).then((result) => {
                                  /* Read more about isConfirmed, isDenied below */
                                  if (result.isConfirmed) {
                                    const {storeId, userId} = item;
                                    unlockUserStore(storeId, userId, "nrtc")
                                      .then(() => {
                                        Swal.fire('Updated Successfully!', '', 'success')
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
                                      }).catch(error => {
                                      Swal.fire('Something went wrong', '', 'error')
                                    })
                                  }
                                })
                              }
                            }}
                            style={{
                              alignItems: 'center',
                              backgroundColor: statusColor[!item.nrtcStatus ? "pending" : item.nrtcStatus],
                              padding: 8,
                              borderRadius: 4,
                              cursor: "pointer"
                            }}>
                            {!item.nrtcStatus ? "pending" : item.nrtcStatus}
                          </span>
                      </td>
                      <td><Link to={`/admin/userReport/detail/${item.id}`}>View Details</Link></td>
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
    )
  }
}

export default UserReportsPage;
