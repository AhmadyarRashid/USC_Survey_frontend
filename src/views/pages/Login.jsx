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
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Alert,
} from "reactstrap";

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
    document.body.classList.toggle("login-page");
  }

  componentWillUnmount() {
    document.body.classList.toggle("login-page");
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

    setTimeout(() => {
      if (email === 'admin@admin.com' && password === "admin") {
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
          errorMsg: "email and password are wrong"
        })
      }
    }, 2000)
  }

  render() {
    const {isLoading, hasError, errorMsg, email, password} = this.state;
    return (
      <>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form className="form">
                <Card className="card-login card-white">
                  <CardHeader>
                    <img
                      alt="..."
                      src={require("assets/img/card-primary.png")}
                    />
                    <CardTitle tag="h1">Log in</CardTitle>
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
                      {isLoading ? 'Loading...': 'Login'}
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
