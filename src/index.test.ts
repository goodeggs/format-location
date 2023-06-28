import {describe, it} from 'mocha';
import {expect} from 'chai';

import FormatLocation, {Location} from '.';

describe('formatLocation', function () {
  let location: Location = {};

  beforeEach(
    () =>
      (location = {
        name: 'Good Eggs HQ',
        address: '530 Hampshire Street',
        address2: 'Suite 301',
        city: 'San Francisco',
        state: 'CA',
        zip: '94110',
        coordinates: {
          latitude: '37.7627904',
          longitude: '-122.4084761',
        },
      }),
  );

  it('formats the full address', () =>
    expect(new FormatLocation().formatLocation(location, 'full')).to.equal(
      '530 Hampshire Street, Suite 301, San Francisco, CA 94110',
    ));

  it('formats the full geocoded address', () =>
    expect(new FormatLocation().formatLocation(location, 'fullGeocoded')).to.equal(
      '530 Hampshire Street, Suite 301, San Francisco, CA 94110@37.7627904,-122.4084761',
    ));

  it('formats the full multiline address', () =>
    expect(new FormatLocation().formatLocation(location, 'fullMultiline')).to.equal(
      '530 Hampshire Street\nSuite 301\nSan Francisco, CA 94110',
    ));

  it('formats the address with city', () =>
    expect(new FormatLocation().formatLocation(location, 'city')).to.equal(
      '530 Hampshire Street, Suite 301, San Francisco',
    ));

  it('formats short address', () =>
    expect(new FormatLocation().formatLocation(location, 'short')).to.equal(
      '530 Hampshire Street, Suite 301',
    ));

  it('formats the short multiline address', () =>
    expect(new FormatLocation().formatLocation(location, 'shortMultiline')).to.equal(
      '530 Hampshire Street\nSuite 301',
    ));

  it('formats custom address format strings', () =>
    expect(new FormatLocation().formatLocation(location, '%(zip); %(city); %(name)')).to.equal(
      '94110; San Francisco; Good Eggs HQ',
    ));

  it('formats location with just the address field', () =>
    expect(new FormatLocation().formatLocation({address: 'hello world'})).to.equal('hello world'));

  it('shortVague returns the short address', () =>
    expect(new FormatLocation().formatLocation(location, 'shortVague')).to.equal(
      '530 Hampshire Street, Suite 301',
    ));

  return describe('a vague address in the location', function () {
    beforeEach(() => (location.vagueAddress = 'Hampshire & Mariposa (by the slow club)'));

    return it('shortVague returns vague address', () =>
      expect(new FormatLocation().formatLocation(location, 'shortVague')).to.equal(
        location.vagueAddress,
      ));
  });
});
