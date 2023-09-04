"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class FormatLocation {
  _locationFormats = {
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
  formatObject(obj, formatString) {
    const paramRegex = /%\((\w+)\)/g;
    return formatString.replace(paramRegex, (_match, key) => {
      const value = obj[key];
      return typeof value === 'object' ? JSON.stringify(value) : value || '';
    });
  }
  containsText(string) {
    return string != null ? string.trim().length : undefined;
  }
  formatLocation(location, formatString) {
    // if there isn't `city`, `zip` and `state`, assume this location object hasn't been converted
    // to the full details structure and the entire address is in the `address` field
    if (!location.city || !location.zip || !location.state || formatString === undefined) {
      return location.address || '';
    }
    const [format, addressLineSeparator] = this._locationFormats[formatString] !== undefined ? this._locationFormats[formatString] : [formatString, ', '];
    location = JSON.parse(JSON.stringify(location));
    location.addressLine = [location.address, location.address2].filter(this.containsText).join(addressLineSeparator);
    location.vagueAddress = location.vagueAddress || location.addressLine;
    const coords = location.coordinates ?? location.coords;
    location.lat = (coords === null || coords === void 0 ? void 0 : coords.latitude) ?? (coords === null || coords === void 0 ? void 0 : coords.lat) ?? undefined;
    location.lng = (coords === null || coords === void 0 ? void 0 : coords.longitude) ?? (coords === null || coords === void 0 ? void 0 : coords.lng) ?? undefined;
    return this.formatObject(location, format);
  }
}
var _default = FormatLocation;
exports.default = _default;