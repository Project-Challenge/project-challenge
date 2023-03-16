const statusParser = (status) => {
  switch (status) {
    case 'AV':
      return 'Avalible'
    case 'TN':
      return 'Taken'
    case 'LT':
      return 'Lost'
    default:
      return 'N/A'
  }
}
export default statusParser
