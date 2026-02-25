import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import styled from 'styled-components'

import NxtWatchContext from '../NxtWatchContext'

const SidebarContainer = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 250px;
    min-height: calc(100vh - 60px);
    padding: 20px 0;
    background-color: ${props => (props.isDark ? '#212121' : '#ffffff')};
    position: sticky;
    top: 60px;
    height: calc(100vh - 60px);
    overflow-y: auto;
  }
`

const MobileSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 20px 0;
`

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const NavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  cursor: pointer;
  background-color: ${props => {
    if (props.isActive) return props.isDark ? '#383838' : '#e2e8f0'
    return 'transparent'
  }};
  &:hover {
    background-color: ${props => (props.isDark ? '#383838' : '#f1f5f9')};
  }
`

const NavIcon = styled.span`
  font-size: 20px;
  color: ${props => {
    if (props.isActive) return '#ff0b37'
    return props.isDark ? '#ffffff' : '#606060'
  }};
  margin-right: 16px;
  display: flex;
  align-items: center;
`

const NavText = styled.p`
  font-size: 14px;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  margin: 0;
  font-family: 'Roboto', sans-serif;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`

const ContactSection = styled.div`
  padding: 20px 24px;
`

const ContactTitle = styled.p`
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  font-family: 'Roboto', sans-serif;
`

const LogosContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`

const SocialLogo = styled.img`
  width: 32px;
  height: 32px;
`

const ContactText = styled.p`
  color: ${props => (props.isDark ? '#94a3b8' : '#475569')};
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
`

const Sidebar = props => {
  const {location} = props
  const pathname = location ? location.pathname : ''

  return (
    <NxtWatchContext.Consumer>
      {({isDarkTheme}) => {
        const SidebarWrapper = location ? SidebarContainer : MobileSidebarContainer

        return (
          <SidebarWrapper isDark={isDarkTheme}>
            <NavList>
              <StyledLink to="/">
                <NavItem isDark={isDarkTheme} isActive={pathname === '/'}>
                  <NavIcon isDark={isDarkTheme} isActive={pathname === '/'}>
                    <AiFillHome />
                  </NavIcon>
                  <NavText isDark={isDarkTheme} isActive={pathname === '/'}>
                    Home
                  </NavText>
                </NavItem>
              </StyledLink>
              <StyledLink to="/trending">
                <NavItem
                  isDark={isDarkTheme}
                  isActive={pathname === '/trending'}
                >
                  <NavIcon
                    isDark={isDarkTheme}
                    isActive={pathname === '/trending'}
                  >
                    <HiFire />
                  </NavIcon>
                  <NavText
                    isDark={isDarkTheme}
                    isActive={pathname === '/trending'}
                  >
                    Trending
                  </NavText>
                </NavItem>
              </StyledLink>
              <StyledLink to="/gaming">
                <NavItem isDark={isDarkTheme} isActive={pathname === '/gaming'}>
                  <NavIcon isDark={isDarkTheme} isActive={pathname === '/gaming'}>
                    <SiYoutubegaming />
                  </NavIcon>
                  <NavText isDark={isDarkTheme} isActive={pathname === '/gaming'}>
                    Gaming
                  </NavText>
                </NavItem>
              </StyledLink>
              <StyledLink to="/saved-videos">
                <NavItem
                  isDark={isDarkTheme}
                  isActive={pathname === '/saved-videos'}
                >
                  <NavIcon
                    isDark={isDarkTheme}
                    isActive={pathname === '/saved-videos'}
                  >
                    <MdPlaylistAdd />
                  </NavIcon>
                  <NavText
                    isDark={isDarkTheme}
                    isActive={pathname === '/saved-videos'}
                  >
                    Saved videos
                  </NavText>
                </NavItem>
              </StyledLink>
            </NavList>
            <ContactSection>
              <ContactTitle isDark={isDarkTheme}>CONTACT US</ContactTitle>
              <LogosContainer>
                <SocialLogo
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <SocialLogo
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <SocialLogo
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </LogosContainer>
              <ContactText isDark={isDarkTheme}>
                Enjoy! Now to see your channels and recommendations!
              </ContactText>
            </ContactSection>
          </SidebarWrapper>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default withRouter(Sidebar)
