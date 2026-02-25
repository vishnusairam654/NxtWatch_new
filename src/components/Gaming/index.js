import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import styled from 'styled-components'

import NxtWatchContext from '../NxtWatchContext'
import Header from '../Header'
import Sidebar from '../Sidebar'

const API_STATUS = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const ContentLayout = styled.div`
  display: flex;
  flex: 1;
`

const GamingContainer = styled.div`
  flex: 1;
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')};
  overflow-y: auto;
`

const BannerSection = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  background-color: ${props => (props.isDark ? '#181818' : '#f1f5f9')};
`

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${props => (props.isDark ? '#000000' : '#e2e8f0')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-size: 22px;
  color: #ff0000;
  flex-shrink: 0;
`

const BannerTitle = styled.h1`
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  font-size: 24px;
  margin: 0;
  font-family: 'Roboto', sans-serif;
`

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`

const VideosList = styled.ul`
  list-style: none;
  padding: 20px;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

const VideoCard = styled.li`
  width: calc(50% - 8px);
  @media (min-width: 768px) {
    width: calc(25% - 12px);
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
`

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 4px;
`

const VideoTitle = styled.p`
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  font-size: 13px;
  margin: 8px 0 4px 0;
  font-family: 'Roboto', sans-serif;
`

const MetaInfo = styled.p`
  color: ${props => (props.isDark ? '#94a3b8' : '#606060')};
  font-size: 12px;
  margin: 0;
  font-family: 'Roboto', sans-serif;
`

const FailureView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
`

const FailureImg = styled.img`
  width: 300px;
  max-width: 100%;
  margin-bottom: 20px;
`

const FailureHeading = styled.h1`
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  font-size: 22px;
  margin-bottom: 12px;
  font-family: 'Roboto', sans-serif;
`

const FailureText = styled.p`
  color: ${props => (props.isDark ? '#94a3b8' : '#606060')};
  font-size: 14px;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
`

const RetryBtn = styled.button`
  padding: 10px 24px;
  background-color: #4f46e5;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
`

class Gaming extends Component {
  state = {
    apiStatus: API_STATUS.LOADING,
    videosList: [],
  }

  componentDidMount() {
    this.fetchVideos()
  }

  fetchVideos = async () => {
    this.setState({apiStatus: API_STATUS.LOADING})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const videos = data.videos.map(v => ({
        id: v.id,
        title: v.title,
        thumbnailUrl: v.thumbnail_url,
        viewCount: v.view_count,
      }))
      this.setState({videosList: videos, apiStatus: API_STATUS.SUCCESS})
    } else {
      this.setState({apiStatus: API_STATUS.FAILURE})
    }
  }

  renderLoader = isDarkTheme => (
    <LoaderContainer>
      <div className="loader-container" data-testid="loader">
        <Loader
          type="ThreeDots"
          color={isDarkTheme ? '#ffffff' : '#4f46e5'}
          height={50}
          width={50}
        />
      </div>
    </LoaderContainer>
  )

  renderFailure = isDarkTheme => {
    const failureImg = isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    return (
      <FailureView>
        <FailureImg src={failureImg} alt="failure view" />
        <FailureHeading isDark={isDarkTheme}>
          Oops! Something Went Wrong
        </FailureHeading>
        <FailureText isDark={isDarkTheme}>
          We are having some trouble to complete your request. Please try again.
        </FailureText>
        <RetryBtn onClick={this.fetchVideos} type="button">
          Retry
        </RetryBtn>
      </FailureView>
    )
  }

  renderVideos = (videosList, isDarkTheme) => (
    <VideosList>
      {videosList.map(video => (
        <VideoCard key={video.id}>
          <StyledLink to={`/videos/${video.id}`}>
            <Thumbnail src={video.thumbnailUrl} alt="video thumbnail" />
            <VideoTitle isDark={isDarkTheme}>{video.title}</VideoTitle>
            <MetaInfo isDark={isDarkTheme}>{video.viewCount} Watching Worldwide</MetaInfo>
          </StyledLink>
        </VideoCard>
      ))}
    </VideosList>
  )

  renderContent = isDarkTheme => {
    const {apiStatus, videosList} = this.state
    switch (apiStatus) {
      case API_STATUS.LOADING:
        return this.renderLoader(isDarkTheme)
      case API_STATUS.SUCCESS:
        return this.renderVideos(videosList, isDarkTheme)
      case API_STATUS.FAILURE:
        return this.renderFailure(isDarkTheme)
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {({isDarkTheme}) => (
          <PageLayout>
            <Header />
            <ContentLayout>
              <Sidebar />
              <GamingContainer isDark={isDarkTheme} data-testid="gaming">
                <BannerSection isDark={isDarkTheme} data-testid="banner">
                  <IconContainer isDark={isDarkTheme}>
                    <SiYoutubegaming />
                  </IconContainer>
                  <BannerTitle isDark={isDarkTheme}>Gaming</BannerTitle>
                </BannerSection>
                {this.renderContent(isDarkTheme)}
              </GamingContainer>
            </ContentLayout>
          </PageLayout>
        )}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Gaming
