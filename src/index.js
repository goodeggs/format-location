/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
let formatLocation;
const _locationFormats = {
  full: ['%(addressLine), %(city), %(state) %(zip)', ', '],
  fullGeocoded: ['%(addressLine), %(city), %(state) %(zip)@%(lat),%(lng)', ', '],
  fullMultiline: ['%(addressLine)\n%(city), %(state) %(zip)', '\n'],
  city: ['%(addressLine), %(city)', ', '],
  zip: ['%(addressLine), %(zip)', ', '],
  cityStateZip: ['%(city), %(state) %(zip)', ''],
  short: ['%(addressLine)', ', '],
  shortMultiline: ['%(addressLine)', '\n'],
  shortVague: ['%(vagueAddress)', ', ']
};

const formatObject = function(obj, formatString) {
  const paramRegex = /%\((\w+)\)/g;
  return formatString.replace(paramRegex, (match, key) => obj[key] || '');
};

const containsText = string => !!(string != null ? string.trim().length : undefined);

module.exports = (formatLocation = function(location, formatString) {
  // if there isn't `city`, `zip` and `state`, assume this location object hasn't been converted
  // to the full details structure and the entire address is in the `address` field
  if (!location.city || !location.zip || !location.state) { return location.address; }

  const [format, addressLineSeparator] = Array.from(_locationFormats[formatString] || [formatString, ', ']);

  location = JSON.parse(JSON.stringify(location));

  location.addressLine = [location.address, location.address2].filter(containsText).join(addressLineSeparator);
  location.vagueAddress = location.vagueAddress || location.addressLine;
  const coords = location.coordinates != null ? location.coordinates : location.coords;
  location.lat = (coords != null ? coords.latitude : undefined) != null ? (coords != null ? coords.latitude : undefined) : (coords != null ? coords.lat : undefined);
  location.lng = (coords != null ? coords.longitude : undefined) != null ? (coords != null ? coords.longitude : undefined) : (coords != null ? coords.lng : undefined);
  return formatObject(location, format);
});

formatLocation.formats = _locationFormats;
