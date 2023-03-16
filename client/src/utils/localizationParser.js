const localizationParser = (status, owner) => {
  if (status === 'AV' || !owner) {
    return 'Tool Storage'
  } else if (status === 'LT') {
    return 'Unknown'
  } else {
    return owner
  }
}
export default localizationParser
