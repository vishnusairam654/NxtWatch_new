import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import {formatDistanceToNow} from 'date-fns'
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

const VideoContainer = styled.div`
  flex: 1;
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')};
  overflow-y: auto;
  padding: 20px;
`

const PlayerWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  margin-bottom: 16px;
`

const VideoTitle = styled.p`
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 12px;
`

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${props => (props.isDark ? '#424242' : '#e2e8f0')};
  margin-bottom: 16px;
`

const MetaLeft = styled.p`
  color: ${props => (props.isDark ? '#94a3b8' : '#606060')};
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  margin: 0;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
`

const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  color: ${props => (props.isActive ? '#2563eb' : '#64748b')};
  padding: 0;
`

const ChannelRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
`

const ChannelLogo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
`

const ChannelInfo = styled.div`
  flex: 1;
`

const ChannelName = styled.p`
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  font-size: 16px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  margin: 0 0 4px 0;
`

const SubscriberCount = styled.p`
  color: ${props => (props.isDark ? '#94a3b8' : '#606060')};
  font-size: 13px;
  font-family: 'Roboto', sans-serif;
  margin: 0 0 12px 0;
`

const Description = styled.p`
  color: ${props => (props.isDark ? '#94a3b8' : '#475569')};
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  line-height: 1.6;
`

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
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

class VideoItemDetails extends Component {
  state = {
    apiStatus: API_STATUS.LOADING,
    videoDetails: null,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.fetchVideoDetails()
  }

  fetchVideoDetails = async () => {
    this.setState({apiStatus: API_STATUS.LOADING})
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const v = data.video_details
      const videoDetails = {
        id: v.id,
        title: v.title,
        videoUrl: v.video_url,
        thumbnailUrl: v.thumbnail_url,
        viewCount: v.view_count,
        publishedAt: v.published_at,
        description: v.description,
        channel: {
          name: v.channel.name,
          profileImageUrl: v.channel.profile_image_url,
          subscriberCount: v.channel.subscriber_count,
        },
      }
      this.setState({videoDetails, apiStatus: API_STATUS.SUCCESS})
    } else {
      this.setState({apiStatus: API_STATUS.FAILURE})
    }
  }

  onClickLike = () => {
    this.setState(prev => ({
      isLiked: !prev.isLiked,
      isDisliked: false,
    }))
  }

  onClickDislike = () => {
    this.setState(prev => ({
      isDisliked: !prev.isDisliked,
      isLiked: false,
    }))
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
        <RetryBtn onClick={this.fetchVideoDetails} type="button">
          Retry
        </RetryBtn>
      </FailureView>
    )
  }

  renderVideoDetails = (isDarkTheme, savedVideosList, addToSavedVideos, removeFromSavedVideos) => {
    const {videoDetails, isLiked, isDisliked} = this.state
    const {
      id,
      title,
      videoUrl,
      viewCount,
      publishedAt,
      description,
      channel,
    } = videoDetails

    const isSaved = savedVideosList.some(v => v.id === id)
    const publishedTime = formatDistanceToNow(new Date(publishedAt))

    const onClickSave = () => {
      if (isSaved) {
        removeFromSavedVideos(id)
      } else {
        addToSavedVideos(videoDetails)
      }
    }

    return (
      <>
        <PlayerWrapper>
          <ReactPlayer url={videoUrl} width="100%" height="100%" controls />
        </PlayerWrapper>
        <VideoTitle isDark={isDarkTheme}>{title}</VideoTitle>
        <MetaRow isDark={isDarkTheme}>
          <MetaLeft isDark={isDarkTheme}>
            {viewCount} views &bull; {publishedTime} ago
          </MetaLeft>
          <ActionButtons>
            <ActionBtn
              isActive={isLiked}
              onClick={this.onClickLike}
              type="button"
            >
              <AiOutlineLike />
              Like
            </ActionBtn>
            <ActionBtn
              isActive={isDisliked}
              onClick={this.onClickDislike}
              type="button"
            >
              <AiOutlineDislike />
              Dislike
            </ActionBtn>
            <ActionBtn
              isActive={isSaved}
              onClick={onClickSave}
              type="button"
            >
              <MdPlaylistAdd />
              {isSaved ? 'Saved' : 'Save'}
            </ActionBtn>
          </ActionButtons>
        </MetaRow>
        <ChannelRow>
          <ChannelLogo
            src={channel.profileImageUrl}
            alt="channel logo"
          />
          <ChannelInfo>
            <ChannelName isDark={isDarkTheme}>{channel.name}</ChannelName>
            <SubscriberCount isDark={isDarkTheme}>
              {channel.subscriberCount} subscribers
            </SubscriberCount>
            <Description isDark={isDarkTheme}>{description}</Description>
          </ChannelInfo>
        </ChannelRow>
      </>
    )
  }

  renderContent = (isDarkTheme, savedVideosList, addToSavedVideos, removeFromSavedVideos) => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case API_STATUS.LOADING:
        return this.renderLoader(isDarkTheme)
      case API_STATUS.SUCCESS:
        return this.renderVideoDetails(isDarkTheme, savedVideosList, addToSavedVideos, removeFromSavedVideos)
      case API_STATUS.FAILURE:
        return this.renderFailure(isDarkTheme)
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {({isDarkTheme, savedVideosList, addToSavedVideos, removeFromSavedVideos}) => (
          <PageLayout>
            <Header />
            <ContentLayout>
              <Sidebar />
              <VideoContainer isDark={isDarkTheme} data-testid="videoItemDetails">
                {this.renderContent(isDarkTheme, savedVideosList, addToSavedVideos, removeFromSavedVideos)}
              </VideoContainer>
            </ContentLayout>
          </PageLayout>
        )}
      </NxtWatchContext.Consumer>
    )
  }
}

export default VideoItemDetails
