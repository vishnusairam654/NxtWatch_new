import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import {formatDistanceToNow} from 'date-fns'
import styled from 'styled-components'

import NxtWatchContext from '../NxtWatchContext'
import Header from '../Header'
import Sidebar from '../Sidebar'

const API_STATUS = {
  INITIAL: 'INITIAL',
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

const HomeContainer = styled.div`
  flex: 1;
  background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')};
  overflow-y: auto;
`

const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  background-position: center;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
`

const BannerLogo = styled.img`
  width: 140px;
  margin-bottom: 12px;
`

const BannerText = styled.p`
  color: #231f20;
  font-size: 18px;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
`

const GetItBtn = styled.button`
  background-color: transparent;
  border: 2px solid #231f20;
  color: #231f20;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
`

const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #231f20;
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  border: 1px solid ${props => (props.isDark ? '#606060' : '#d7dfe9')};
  border-radius: 4px;
  overflow: hidden;
  max-width: 600px;
`

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 16px;
  border: none;
  outline: none;
  font-size: 14px;
  background-color: transparent;
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  font-family: 'Roboto', sans-serif;
`

const SearchBtn = styled.button`
  padding: 10px 16px;
  background-color: ${props => (props.isDark ? '#383838' : '#f1f5f9')};
  border: none;
  border-left: 1px solid ${props => (props.isDark ? '#606060' : '#d7dfe9')};
  cursor: pointer;
  font-size: 18px;
  color: ${props => (props.isDark ? '#ffffff' : '#606060')};
  display: flex;
  align-items: center;
`

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`

const VideosList = styled.ul`
  list-style: none;
  padding: 0 20px;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

const VideoCard = styled.li`
  width: 100%;
  @media (min-width: 576px) {
    width: calc(50% - 8px);
  }
  @media (min-width: 992px) {
    width: calc(33.33% - 12px);
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 4px;
`

const VideoInfo = styled.div`
  display: flex;
  margin-top: 8px;
`

const ChannelLogo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
`

const VideoDetails = styled.div`
  flex: 1;
`

const VideoTitle = styled.p`
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  font-size: 14px;
  margin: 0 0 4px 0;
  font-family: 'Roboto', sans-serif;
  line-height: 1.4;
`

const ChannelName = styled.p`
  color: ${props => (props.isDark ? '#94a3b8' : '#606060')};
  font-size: 12px;
  margin: 0 0 4px 0;
  font-family: 'Roboto', sans-serif;
`

const MetaInfo = styled.p`
  color: ${props => (props.isDark ? '#94a3b8' : '#606060')};
  font-size: 12px;
  margin: 0;
  font-family: 'Roboto', sans-serif;
`

const NoVideosView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
`

const NoVideosImg = styled.img`
  width: 300px;
  max-width: 100%;
  margin-bottom: 20px;
`

const NoVideosHeading = styled.h1`
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  font-size: 22px;
  margin-bottom: 12px;
  font-family: 'Roboto', sans-serif;
`

const NoVideosText = styled.p`
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

class Home extends Component {
  state = {
    apiStatus: API_STATUS.LOADING,
    videosList: [],
    searchInput: '',
    showBanner: true,
  }

  componentDidMount() {
    this.fetchVideos()
  }

  fetchVideos = async () => {
    this.setState({apiStatus: API_STATUS.LOADING})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        publishedAt: v.published_at,
        channel: {
          name: v.channel.name,
          profileImageUrl: v.channel.profile_image_url,
        },
      }))
      this.setState({videosList: videos, apiStatus: API_STATUS.SUCCESS})
    } else {
      this.setState({apiStatus: API_STATUS.FAILURE})
    }
  }

  onChangeSearch = e => this.setState({searchInput: e.target.value})

  onClickSearch = () => this.fetchVideos()

  onCloseBanner = () => this.setState({showBanner: false})

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

  renderNoVideos = isDarkTheme => (
    <NoVideosView>
      <NoVideosImg
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <NoVideosHeading isDark={isDarkTheme}>
        No Search results found
      </NoVideosHeading>
      <NoVideosText isDark={isDarkTheme}>
        Try different key words or remove search filter
      </NoVideosText>
      <RetryBtn onClick={this.fetchVideos} type="button">
        Retry
      </RetryBtn>
    </NoVideosView>
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

  renderVideos = (videosList, isDarkTheme) => {
    if (videosList.length === 0) {
      return this.renderNoVideos(isDarkTheme)
    }
    return (
      <VideosList>
        {videosList.map(video => {
          const publishedTime = formatDistanceToNow(new Date(video.publishedAt))
          return (
            <VideoCard key={video.id}>
              <StyledLink to={`/videos/${video.id}`}>
                <Thumbnail
                  src={video.thumbnailUrl}
                  alt="video thumbnail"
                />
                <VideoInfo>
                  <ChannelLogo
                    src={video.channel.profileImageUrl}
                    alt="channel logo"
                  />
                  <VideoDetails>
                    <VideoTitle isDark={isDarkTheme}>{video.title}</VideoTitle>
                    <ChannelName isDark={isDarkTheme}>
                      {video.channel.name}
                    </ChannelName>
                    <MetaInfo isDark={isDarkTheme}>
                      {video.viewCount} views &bull; {publishedTime} ago
                    </MetaInfo>
                  </VideoDetails>
                </VideoInfo>
              </StyledLink>
            </VideoCard>
          )
        })}
      </VideosList>
    )
  }

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
    const {searchInput, showBanner} = this.state
    return (
      <NxtWatchContext.Consumer>
        {({isDarkTheme}) => (
          <PageLayout>
            <Header />
            <ContentLayout>
              <Sidebar />
              <HomeContainer isDark={isDarkTheme} data-testid="home">
                {showBanner && (
                  <BannerContainer data-testid="banner">
                    <BannerContent>
                      <BannerLogo
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="nxt watch logo"
                      />
                      <BannerText>
                        Buy Nxt Watch Premium prepaid plans with UPI
                      </BannerText>
                      <GetItBtn type="button">GET IT NOW</GetItBtn>
                    </BannerContent>
                    <CloseBtn
                      data-testid="close"
                      onClick={this.onCloseBanner}
                      type="button"
                    >
                      <AiOutlineClose />
                    </CloseBtn>
                  </BannerContainer>
                )}
                <SearchContainer isDark={isDarkTheme}>
                  <SearchInput
                    type="search"
                    placeholder="Search"
                    value={searchInput}
                    onChange={this.onChangeSearch}
                    isDark={isDarkTheme}
                  />
                  <SearchBtn
                    data-testid="searchButton"
                    onClick={this.onClickSearch}
                    isDark={isDarkTheme}
                    type="button"
                  >
                    <AiOutlineSearch />
                  </SearchBtn>
                </SearchContainer>
                {this.renderContent(isDarkTheme)}
              </HomeContainer>
            </ContentLayout>
          </PageLayout>
        )}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Home
