import {Link} from 'react-router-dom'
import {MdPlaylistAdd} from 'react-icons/md'
import {formatDistanceToNow} from 'date-fns'
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

const SavedVideosContainer = styled.div`
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

const NoVideosView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  min-height: 400px;
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
  font-family: 'Roboto', sans-serif;
`

const VideosList = styled.ul`
  list-style: none;
  padding: 20px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const VideoCard = styled.li``

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  gap: 16px;
`

const Thumbnail = styled.img`
  width: 200px;
  border-radius: 4px;
  object-fit: cover;
  @media (max-width: 575px) {
    width: 100%;
  }
`

const VideoDetails = styled.div`
  flex: 1;
`

const VideoTitle = styled.p`
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
  font-size: 16px;
  margin: 0 0 8px 0;
  font-family: 'Roboto', sans-serif;
`

const ChannelName = styled.p`
  color: ${props => (props.isDark ? '#94a3b8' : '#606060')};
  font-size: 13px;
  margin: 0 0 4px 0;
  font-family: 'Roboto', sans-serif;
`

const MetaInfo = styled.p`
  color: ${props => (props.isDark ? '#94a3b8' : '#606060')};
  font-size: 13px;
  margin: 0;
  font-family: 'Roboto', sans-serif;
`

const SavedVideos = () => (
  <NxtWatchContext.Consumer>
    {({isDarkTheme, savedVideosList}) => (
      <PageLayout>
        <Header />
        <ContentLayout>
          <Sidebar />
          <SavedVideosContainer isDark={isDarkTheme} data-testid="savedVideos">
            {savedVideosList.length > 0 && (
              <BannerSection isDark={isDarkTheme} data-testid="banner">
                <IconContainer isDark={isDarkTheme}>
                  <MdPlaylistAdd />
                </IconContainer>
                <BannerTitle isDark={isDarkTheme}>Saved Videos</BannerTitle>
              </BannerSection>
            )}
            {savedVideosList.length === 0 ? (
              <NoVideosView>
                <NoVideosImg
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                />
                <NoVideosHeading isDark={isDarkTheme}>
                  No saved videos found
                </NoVideosHeading>
                <NoVideosText isDark={isDarkTheme}>
                  You can save your videos while watching them
                </NoVideosText>
              </NoVideosView>
            ) : (
              <VideosList>
                {savedVideosList.map(video => {
                  const publishedTime = formatDistanceToNow(
                    new Date(video.publishedAt),
                  )
                  return (
                    <VideoCard key={video.id}>
                      <StyledLink to={`/videos/${video.id}`}>
                        <Thumbnail
                          src={video.thumbnailUrl}
                          alt="video thumbnail"
                        />
                        <VideoDetails>
                          <VideoTitle isDark={isDarkTheme}>
                            {video.title}
                          </VideoTitle>
                          <ChannelName isDark={isDarkTheme}>
                            {video.channel.name}
                          </ChannelName>
                          <MetaInfo isDark={isDarkTheme}>
                            {video.viewCount} views &bull; {publishedTime} ago
                          </MetaInfo>
                        </VideoDetails>
                      </StyledLink>
                    </VideoCard>
                  )
                })}
              </VideosList>
            )}
          </SavedVideosContainer>
        </ContentLayout>
      </PageLayout>
    )}
  </NxtWatchContext.Consumer>
)

export default SavedVideos
