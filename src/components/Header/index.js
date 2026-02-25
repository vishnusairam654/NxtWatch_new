import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdClose} from 'react-icons/md'
import styled from 'styled-components'
import {useState} from 'react'

import NxtWatchContext from '../NxtWatchContext'
import Sidebar from '../Sidebar'

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  background-color: ${props => (props.isDark ? '#212121' : '#ffffff')};
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const LogoImg = styled.img`
  height: 30px;
`

const NavItems = styled.div`
  display: flex;
  align-items: center;
`

const ThemeBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  padding: 4px;
  display: flex;
  align-items: center;
`

const ProfileImg = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  margin: 0 16px;
`

const LogoutBtn = styled.button`
  background-color: transparent;
  border: 2px solid ${props => (props.isDark ? '#ffffff' : '#3b82f6')};
  color: ${props => (props.isDark ? '#ffffff' : '#3b82f6')};
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
`

const PopupContent = styled.div`
  background-color: ${props => (props.isDark ? '#313131' : '#ffffff')};
  border-radius: 12px;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
  width: 90%;
`

const PopupText = styled.p`
  color: ${props => (props.isDark ? '#ffffff' : '#231f20')};
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
`

const PopupBtnContainer = styled.div`
  display: flex;
  gap: 16px;
`

const CancelBtn = styled.button`
  padding: 8px 20px;
  border: 2px solid #94a3b8;
  background: transparent;
  color: ${props => (props.isDark ? '#ffffff' : '#64748b')};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
`

const ConfirmBtn = styled.button`
  padding: 8px 20px;
  background-color: #4f46e5;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
`

const HamburgerBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  display: flex;
  align-items: center;
  margin-left: 8px;
  @media (min-width: 768px) {
    display: none;
  }
`

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => (props.isDark ? '#212121' : '#ffffff')};
  z-index: 200;
  display: flex;
  flex-direction: column;
`

const MobileMenuClose = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  align-self: flex-end;
  padding: 16px;
`

const Header = props => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <NxtWatchContext.Consumer>
      {({isDarkTheme, toggleTheme}) => {
        const logoUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        const onClickConfirm = () => {
          const {history} = props
          Cookies.remove('jwt_token')
          history.replace('/login')
        }

        return (
          <>
            <NavBar isDark={isDarkTheme}>
              <Link to="/">
                <LogoImg src={logoUrl} alt="website logo" />
              </Link>
              <NavItems>
                <ThemeBtn
                  data-testid="theme"
                  onClick={toggleTheme}
                  isDark={isDarkTheme}
                  type="button"
                >
                  {isDarkTheme ? <FiSun /> : <FaMoon />}
                </ThemeBtn>
                <ProfileImg
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
                <Popup
                  modal
                  trigger={
                    <LogoutBtn isDark={isDarkTheme} type="button">
                      Logout
                    </LogoutBtn>
                  }
                  className="popup-content"
                >
                  {close => (
                    <PopupContent isDark={isDarkTheme}>
                      <PopupText isDark={isDarkTheme}>
                        Are you sure, you want to logout
                      </PopupText>
                      <PopupBtnContainer>
                        <CancelBtn
                          isDark={isDarkTheme}
                          onClick={close}
                          type="button"
                        >
                          Cancel
                        </CancelBtn>
                        <ConfirmBtn onClick={onClickConfirm} type="button">
                          Confirm
                        </ConfirmBtn>
                      </PopupBtnContainer>
                    </PopupContent>
                  )}
                </Popup>
                <HamburgerBtn
                  isDark={isDarkTheme}
                  onClick={() => setShowMobileMenu(true)}
                  type="button"
                >
                  <GiHamburgerMenu />
                </HamburgerBtn>
              </NavItems>
            </NavBar>
            {showMobileMenu && (
              <MobileMenuOverlay isDark={isDarkTheme}>
                <MobileMenuClose
                  isDark={isDarkTheme}
                  onClick={() => setShowMobileMenu(false)}
                  type="button"
                >
                  <MdClose />
                </MobileMenuClose>
                <Sidebar />
              </MobileMenuOverlay>
            )}
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default withRouter(Header)
