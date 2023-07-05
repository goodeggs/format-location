export interface Location {
  name?: string;
  city?: string;
  zip?: string;
  state?: string;
  address?: string;
  addressLine?: string;
  address2?: string;
  vagueAddress?: string;
  coordinates?: {latitude: string; longitude: string; lat?: string; lng?: string};
  coords?: {latitude: string; longitude: string; lat: string; lng: string};
  lat?: string;
  lng?: string;
}

interface LocationFormats {
  [key: string]: [string, string];
}

class FormatLocation {
  _locationFormats: LocationFormats = {
    full: ['%(addressLine), %(city), %(state) %(zip)', ', '],
    fullGeocoded: ['%(addressLine), %(city), %(state) %(zip)@%(lat),%(lng)', ', '],
    fullMultiline: ['%(addressLine)\n%(city), %(state) %(zip)', '\n'],
    city: ['%(addressLine), %(city)', ', '],
    zip: ['%(addressLine), %(zip)', ', '],
    cityStateZip: ['%(city), %(state) %(zip)', ''],
    short: ['%(addressLine)', ', '],
    shortMultiline: ['%(addressLine)', '\n'],
    shortVague: ['%(vagueAddress)', ', '],
  };

  formatObject(obj: Location, formatString: string): string {
    const paramRegex = /%\((\w+)\)/g;
    return formatString.replace(paramRegex, (_match, key: keyof Location) => {
      const value = obj[key];
      return typeof value === 'object' ? JSON.stringify(value) : value || '';
    });
  }

  containsText(string: string | undefined): number | undefined {
    return string != null ? string.trim().length : undefined;
  }

  formatLocation(location: Location, formatString?: keyof LocationFormats): string {
    // if there isn't `city`, `zip` and `state`, assume this location object hasn't been converted
    // to the full details structure and the entire address is in the `address` field
    if (!location.city || !location.zip || !location.state || formatString === undefined) {
      return location.address || '';
    }

    const [format, addressLineSeparator] =
      this._locationFormats[formatString] !== undefined
        ? this._locationFormats[formatString]
        : [formatString, ', '];

    location = JSON.parse(JSON.stringify(location));

    location.addressLine = [location.address, location.address2]
      .filter(this.containsText)
      .join(addressLineSeparator);
    location.vagueAddress = location.vagueAddress || location.addressLine;
    const coords = location.coordinates != null ? location.coordinates : location.coords;
    location.lat =
      (coords != null ? coords.latitude : undefined) != null
        ? coords != null
          ? coords.latitude
          : undefined
        : coords != null
        ? coords.lat
        : undefined;
    location.lng =
      (coords != null ? coords.longitude : undefined) != null
        ? coords != null
          ? coords.longitude
          : undefined
        : coords != null
        ? coords.lng
        : undefined;
    return this.formatObject(location, format as string);
  }
}

export default FormatLocation;
