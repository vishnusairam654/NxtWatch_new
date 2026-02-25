import {Link} from 'react-router-dom'
import styled from 'styled-components'

import NxtWatchContext from '../NxtWatchContext'
import Header from '../Header'
import Sidebar from '../Sidebar'

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const ContentLayout = styled.div`
  display: flex;
  flex: 1;
`

const NotFoundContainer = styled.div`
  flex: 1;
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
`

const NotFoundImg = styled.img`
  width: 400px;
  max-width: 100%;
  margin-bottom: 24px;
`

const NotFoundHeading = styled.h1`
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  font-size: 28px;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
`

const NotFoundText = styled.p`
  color: ${props => (props.isDark ? '#94a3b8' : '#606060')};
  font-size: 16px;
  margin-bottom: 24px;
  font-family: 'Roboto', sans-serif;
`

const HomeLink = styled(Link)`
  padding: 10px 24px;
  background-color: #4f46e5;
  color: #ffffff;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
`

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {({isDarkTheme}) => {
      const notFoundImg = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <PageLayout>
          <Header />
          <ContentLayout>
            <Sidebar />
            <NotFoundContainer isDark={isDarkTheme}>
              <NotFoundImg src={notFoundImg} alt="not found" />
              <NotFoundHeading isDark={isDarkTheme}>
                Page Not Found
              </NotFoundHeading>
              <NotFoundText isDark={isDarkTheme}>
                we are sorry, the page you requested could not be found.
              </NotFoundText>
              <HomeLink to="/">Go to Home</HomeLink>
            </NotFoundContainer>
          </ContentLayout>
        </PageLayout>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound
