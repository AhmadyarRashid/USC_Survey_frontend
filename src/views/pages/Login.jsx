import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Alert,
} from "reactstrap";
import Logo from "../../assets/img/card-primary.png"
import {loginApi} from "../../api/user"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: '',
      isLoading: false,
      hasError: false,
    }
  }

  componentDidMount() {
    document.body.classList.add("white-content");
    document.body.classList.toggle("login-page");
  }

  componentWillUnmount() {
    // document.body.classList.toggle("login-page");
  }

  onInputChangeHandler = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  onFormSubmit = () => {
    const {email, password} = this.state;
    const {history} = this.props;
    this.setState({
      isLoading: true
    })

    loginApi(email, password)
      .then(response => {
        if (response.isSuccess) {
          const { userId, email } = response.payload;
          localStorage.setItem("token", userId)
          localStorage.setItem("email", email)
          this.setState({
            hasError: false,
            isLoading: false,
            errorMsg: ""
          })
          history.push("/admin/dashboard")
        } else {
          this.setState({
            hasError: true,
            isLoading: false,
            errorMsg: response.message
          })
        }
        console.log("user login", response)
      })
      .catch(error => {
        console.log("error")
      })
  }

  render() {
    const {isLoading, hasError, errorMsg} = this.state;
    return (
      <>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form className="form">
                <Card className="card-login card-white">
                  <CardHeader style={{padding: "40px 0px 40px 0px"}}>
                    <CardTitle align="center" style={{color: "#ce51df"}} tag="h1">Log in</CardTitle>
                  </CardHeader>
                  <CardBody>
                    {hasError && <Alert color="danger">{errorMsg}</Alert>}
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        onChange={event => this.onInputChangeHandler("email", event.target.value)}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        onChange={event => this.onInputChangeHandler("password", event.target.value)}
                      />
                    </InputGroup>
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="mb-3"
                      color="primary"
                      href="#pablo"
                      onClick={e => {
                        e.preventDefault()
                        this.onFormSubmit()
                      }}
                      size="lg"
                    >
                      {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
      </>
    );
  }
}

export default Login;
