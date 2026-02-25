import React from 'react'

const NxtWatchContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  savedVideosList: [],
  addToSavedVideos: () => {},
  removeFromSavedVideos: () => {},
})

export default NxtWatchContext
