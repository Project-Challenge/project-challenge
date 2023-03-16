function changeDotColor(status) {
  switch (status) {
    case 'TN':
      return 'w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-full bg-red-500'
    case 'AV':
      return 'w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-full bg-green-500'
    case 'LT':
      return 'w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-full bg-yellow-500'
    default:
      return 'w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-full bg-black-500'
  }
}
export default changeDotColor
