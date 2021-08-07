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
import Multiselect from 'multiselect-react-dropdown';
import Swal from 'sweetalert2'
import {getAllHeadOffices, getZones, getRegions, getCities, getStores} from "../../api/area";
import {createUser, getProfile, updateUser} from "../../api/user"

class CreateUserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.headOfficeRef = React.createRef()
    this.zoneRef = React.createRef()
    this.regionRef = React.createRef()
    this.cityRef = React.createRef()
    this.storeRef = React.createRef()

    this.state = {
      name: '',
      email: '',
      phoneNo: '',
      address: '',
      password: '',
      retypePassword: '',
      errorMsg: '',
      isLoading: false,
      hasError: false,

      headOfficeList: [],
      zoneList: [],
      regionList: [],
      cityList: [],
      storeList: [],

      selectedHeadOffices: [],
      selectedZones: [],
      selectedRegions: [],
      selectedCities: [],
      selectedStores: [],

      isEdit: false,
      selectedUserId: -1,
    }
  }

  componentDidMount() {
    const splitPathName = this.props.location.pathname.split("/")
    if (splitPathName.length > 4) {
      this.setState({
        isEdit: true,
        selectedUserId: splitPathName[splitPathName.length - 1]
      })
      getProfile(splitPathName[splitPathName.length - 1])
        .then(response => {
          console.log("profile:", response)
          const {isSuccess, payload} = response
          if (isSuccess) {
            const {currentUser: {name, address, phoneNo}} = payload
            this.setState({
              name,
              // email: '',
              phoneNo,
              address,
            })
          }
        })
        .catch(error => {
          console.log("profile error:", error)
        })
    }
    getAllHeadOffices()
      .then(response => {
        if (response.isSuccess) {
          const {payload} = response
          this.setState({
            headOfficeList: payload.map(item => ({
              cat: '1',
              name: item.name,
              id: item.id,
            }))
          })
        }
      })
  }

  onHeadOfficeSelectHandler = (item) => {
    if (item.length > 0) {
      getZones()
        .then(response => {
          if (response.isSuccess) {
            const {payload} = response
            this.setState({
              selectedHeadOffices: item.map(i => i.id),
              zoneList: payload.map(item => ({
                cat: '1',
                name: item.name,
                id: item.id,
              }))
            })
          }
        })
    } else {
      this.zoneRef.current.resetSelectedValues([])
      this.regionRef.current.resetSelectedValues([])
      this.cityRef.current.resetSelectedValues([])
      this.storeRef.current.resetSelectedValues([])
      this.setState({
        selectedHeadOffices: [],
        zoneList: []
      })
    }
  }

  onZoneSelectHandler = (item) => {
    if (item.length > 0) {
      getRegions(item[0].id)
        .then(response => {
          if (response.isSuccess) {
            const {payload} = response
            this.setState({
              selectedZones: item.map(i => i.id),
              regionList: payload.map(item => ({
                cat: '1',
                name: item.name,
                id: item.id,
              }))
            })
          }
        })
    } else {
      this.regionRef.current.resetSelectedValues([])
      this.cityRef.current.resetSelectedValues([])
      this.storeRef.current.resetSelectedValues([])
      this.setState({
        selectedZones: [],
        regionList: []
      })
    }
  }

  onRegionSelectHandler = (item) => {
    if (item.length > 0) {
      getCities(item[0].id)
        .then(response => {
          if (response.isSuccess) {
            const {payload} = response
            this.setState({
              selectedRegions: item.map(i => i.id),
              cityList: payload.map(item => ({
                cat: '1',
                name: item.name,
                id: item.id,
              }))
            })
          }
        })
    } else {
      this.cityRef.current.resetSelectedValues([])
      this.storeRef.current.resetSelectedValues([])
      this.setState({
        selectedRegions: [],
        cityList: []
      })
    }
  }

  onCitySelectHandler = (item) => {
    if (item.length > 0) {
      getStores(item[0].id)
        .then(response => {
          if (response.isSuccess) {
            const {payload} = response
            this.setState({
              selectedCities: item.map(i => i.id),
              storeList: payload.map(item => ({
                cat: '1',
                name: item.name,
                id: item.id,
              }))
            })
          }
        })
    } else {
      this.storeRef.current.resetSelectedValues([])
      this.setState({
        selectedCities: [],
        storeList: []
      })
    }
  }

  onInputChangeHandler = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  onResetHandler = () => {
    this.headOfficeRef.current.resetSelectedValues([])
    this.zoneRef.current.resetSelectedValues([])
    this.regionRef.current.resetSelectedValues([])
    this.cityRef.current.resetSelectedValues([])
    this.storeRef.current.resetSelectedValues([])
    this.setState({
      name: '',
      email: '',
      phoneNo: '',
      address: '',
      password: '',
      retypePassword: ''
    })
  }

  onSaveCustomerHandler = () => {
    const {
      name, address, email, phoneNo, password, retypePassword,
      selectedHeadOffices, selectedZones, selectedRegions,
      selectedCities, selectedStores, isEdit, selectedUserId
    } = this.state;

    this.setState({
      isLoading: true,
      hasError: false,
      errorMsg: ""
    })

    if (isEdit) {
      const data = {
        userId: selectedUserId,
        name, address, phoneNo,
        headOfficeIds: !selectedHeadOffices ? null : selectedHeadOffices.toString(),
        zoneIds: !selectedZones ? null : selectedZones.toString(),
        regionIds: !selectedRegions ? null : selectedRegions.toString(),
        cityIds: !selectedCities ? null : selectedCities.toString(),
        storeIds: !selectedStores ? null : selectedStores.map(item => item.id).toString()
      }

      updateUser(data)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'User Update Successfully'
          })
          this.props.history.push("/admin/users")
        }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong. please try again later.'
        })
      })

    } else {
      const data = {
        name, address, phoneNo, email, password,
        confirmPassword: retypePassword,
        headOfficeIds: !selectedHeadOffices ? null : selectedHeadOffices.toString(),
        zoneIds: !selectedZones ? null : selectedZones.toString(),
        regionIds: !selectedRegions ? null : selectedRegions.toString(),
        cityIds: !selectedCities ? null : selectedCities.toString(),
        storeIds: !selectedStores ? null : selectedStores.map(item => item.id).toString()
      }

      if (!name || !email || !password || !retypePassword) {
        this.setState({
          hasError: true,
          isLoading: false,
          errorMsg: "Some field are empty"
        })
      } else if (password !== retypePassword) {
        this.setState({
          hasError: true,
          isLoading: false,
          errorMsg: "Both password field are mis-matched"
        })
      } else {
        createUser(data)
          .then(response => {
            if (response.isSuccess) {
              alert("user created successfully")
              this.setState({
                isLoading: false,
                hasError: false,
                errorMsg: ""
              })
              this.onResetHandler()
            } else {
              this.setState({
                hasError: true,
                isLoading: false,
                errorMsg: response.message
              })
            }
          })
      }
    }
  }

  render() {
    const {
      hasError, isLoading, errorMsg, headOfficeList, zoneList,
      regionList, cityList, storeList, name, phoneNo, address, email,
      password, retypePassword, isEdit
    } = this.state
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">{isEdit ? "Edit User" : "Create New User"}</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal">
                    {hasError && <Alert color="danger">{errorMsg}</Alert>}
                    <Row>
                      <Label sm="2">name</Label>
                      <Col sm="10">
                        <FormGroup>
                          <Input
                            type="text"
                            value={name}
                            onChange={e => this.onInputChangeHandler("name", e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {!isEdit && <Row>
                      <Label sm="2">Email</Label>
                      <Col sm="10">
                        <FormGroup>
                          <Input
                            type="text"
                            value={email}
                            onChange={e => this.onInputChangeHandler("email", e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>}
                    <Row>
                      <Label sm="2">phone No</Label>
                      <Col className="checkbox-radios" sm="10">
                        <FormGroup>
                          <Input
                            type="text"
                            value={phoneNo}
                            onChange={e => this.onInputChangeHandler("phoneNo", e.target.value)}
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
                            value={address}
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
                            displayValue="name"
                            ref={this.headOfficeRef}
                            onRemove={item => this.onHeadOfficeSelectHandler(item)}
                            onSelect={item => this.onHeadOfficeSelectHandler(item)}
                            options={headOfficeList}
                            selectionLimit={1}
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
                            displayValue="name"
                            ref={this.zoneRef}
                            onRemove={item => this.onZoneSelectHandler(item)}
                            onSelect={item => this.onZoneSelectHandler(item)}
                            options={zoneList}
                            selectionLimit={1}
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
                            displayValue="name"
                            ref={this.regionRef}
                            onRemove={item => this.onRegionSelectHandler(item)}
                            onSelect={item => this.onRegionSelectHandler(item)}
                            options={regionList}
                            selectionLimit={1}
                            showCheckbox
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="2">Cities</Label>
                      <Col sm="10">
                        <FormGroup>
                          <Multiselect
                            displayValue="name"
                            ref={this.cityRef}
                            onRemove={item => this.onCitySelectHandler(item)}
                            onSelect={item => this.onCitySelectHandler(item)}
                            options={cityList}
                            selectionLimit={1}
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
                            displayValue="name"
                            ref={this.storeRef}
                            onRemove={items => this.setState({selectedStores: items})}
                            onSelect={items => this.setState({selectedStores: items})}
                            options={storeList}
                            showCheckbox
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {!isEdit && <React.Fragment>
                      <Row>
                        <Label sm="2">Password</Label>
                        <Col sm="10">
                          <FormGroup>
                            <Input
                              type="password"
                              autoComplete="off"
                              value={password}
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
                              value={retypePassword}
                              autoComplete="off"
                              onChange={e => this.onInputChangeHandler("retypePassword", e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </React.Fragment>}
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" onClick={() => {
                    this.onSaveCustomerHandler()
                  }}>
                    {isLoading ? 'Loading...' : isEdit ? 'Save' : 'Create'}
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

export default CreateUserComponent;
