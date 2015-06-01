_locationFormats =
  full: ['%(addressLine), %(city), %(state) %(zip)', ', ']
  fullGeocoded: ['%(addressLine), %(city), %(state) %(zip)@%(lat),%(lng)', ', ']
  fullMultiline: ['%(addressLine)\n%(city), %(state) %(zip)', '\n']
  city: ['%(addressLine), %(city)', ', ']
  zip: ['%(addressLine), %(zip)', ', ']
  cityStateZip: ['%(city), %(state) %(zip)', '']
  short: ['%(addressLine)', ', ']
  shortMultiline: ['%(addressLine)', '\n']
  shortVague: ['%(vagueAddress)', ', ']

formatObject = (obj, formatString) ->
  paramRegex = /%\((\w+)\)/g
  formatString.replace paramRegex, (match, key) ->
    obj[key] or ''

containsText = (string) ->
  !!(string?.trim().length)

module.exports = formatLocation = (location, formatString) ->
  # if there isn't `city`, `zip` and `state`, assume this location object hasn't been converted
  # to the full details structure and the entire address is in the `address` field
  return location.address unless location.city and location.zip and location.state

  [format, addressLineSeparator] = _locationFormats[formatString] or [formatString, ', ']

  location = JSON.parse(JSON.stringify(location))

  location.addressLine = [location.address, location.address2].filter(containsText).join(addressLineSeparator)
  location.vagueAddress = location.vagueAddress or location.addressLine
  coords = location.coordinates ? location.coords
  location.lat = coords?.latitude ? coords?.lat
  location.lng = coords?.longitude ? coords?.lng
  formatObject location, format

formatLocation.formats = _locationFormats
