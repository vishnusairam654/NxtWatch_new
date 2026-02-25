import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import styled from 'styled-components'

import NxtWatchContext from '../NxtWatchContext'

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => (props.isDark ? '#313131' : '#f9f9f9')};
`

const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#ffffff')};
  padding: 40px;
  border-radius: 8px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`

const LogoImg = styled.img`
  width: 180px;
  margin-bottom: 30px;
`

const FormEl = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const LabelEl = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props.isDark ? '#94a3b8' : '#475569')};
  margin-bottom: 6px;
  margin-top: 16px;
  font-family: 'Roboto', sans-serif;
`

const InputEl = styled.input`
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background-color: transparent;
  color: ${props => (props.isDark ? '#ffffff' : '#231f20')};
  &:focus {
    border-color: #4f46e5;
  }
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`

const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  margin-right: 8px;
`

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
`

const LoginBtn = styled.button`
  margin-top: 24px;
  padding: 12px;
  background-color: #4f46e5;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  &:hover {
    background-color: #4338ca;
  }
`

const ErrorMsg = styled.p`
  color: #ff0b37;
  font-size: 12px;
  margin-top: 8px;
  font-family: 'Roboto', sans-serif;
`

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
    showError: false,
  }

  onChangeUsername = e => this.setState({username: e.target.value})

  onChangePassword = e => this.setState({password: e.target.value})

  onToggleShowPassword = () =>
    this.setState(prev => ({showPassword: !prev.showPassword}))

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg: `*${errorMsg}`, showError: true})
  }

  onSubmitForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showPassword, errorMsg, showError} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <NxtWatchContext.Consumer>
        {({isDarkTheme}) => {
          const logoUrl = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <LoginPage isDark={isDarkTheme}>
              <LoginCard isDark={isDarkTheme}>
                <LogoImg src={logoUrl} alt="website logo" />
                <FormEl onSubmit={this.onSubmitForm}>
                  <LabelEl htmlFor="username" isDark={isDarkTheme}>
                    USERNAME
                  </LabelEl>
                  <InputEl
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={this.onChangeUsername}
                    isDark={isDarkTheme}
                  />
                  <LabelEl htmlFor="password" isDark={isDarkTheme}>
                    PASSWORD
                  </LabelEl>
                  <InputEl
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.onChangePassword}
                    isDark={isDarkTheme}
                  />
                  <CheckboxContainer>
                    <CheckboxInput
                      type="checkbox"
                      id="showPassword"
                      checked={showPassword}
                      onChange={this.onToggleShowPassword}
                    />
                    <CheckboxLabel htmlFor="showPassword" isDark={isDarkTheme}>
                      Show Password
                    </CheckboxLabel>
                  </CheckboxContainer>
                  <LoginBtn type="submit">Login</LoginBtn>
                  {showError && <ErrorMsg>{errorMsg}</ErrorMsg>}
                </FormEl>
              </LoginCard>
            </LoginPage>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Login
