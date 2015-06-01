formatLocation = require '..'
{expect} = require 'chai'

describe 'formatLocation', ->
  {location} = {}

  beforeEach ->
    location =
      name: 'Good Eggs HQ'
      address: '530 Hampshire Street'
      address2: 'Suite 301'
      city: 'San Francisco'
      state: 'CA'
      zip: '94110'
      coordinates:
        latitude: '37.7627904'
        longitude: '-122.4084761'

  it 'formats the full address', ->
    expect(formatLocation(location, 'full')).to.equal '530 Hampshire Street, Suite 301, San Francisco, CA 94110'

  it 'formats the full geocoded address', ->
    expect(formatLocation(location, 'fullGeocoded')).to.equal '530 Hampshire Street, Suite 301, San Francisco, CA 94110@37.7627904,-122.4084761'

  it 'formats the full multiline address', ->
    expect(formatLocation(location, 'fullMultiline')).to.equal '530 Hampshire Street\nSuite 301\nSan Francisco, CA 94110'

  it 'formats the address with city', ->
    expect(formatLocation(location, 'city')).to.equal '530 Hampshire Street, Suite 301, San Francisco'

  it 'formats short address', ->
    expect(formatLocation(location, 'short')).to.equal '530 Hampshire Street, Suite 301'

  it 'formats the short multiline address', ->
    expect(formatLocation(location, 'shortMultiline')).to.equal '530 Hampshire Street\nSuite 301'

  it 'formats custom address format strings', ->
    expect(formatLocation(location, '%(zip); %(city); %(name)')).to.equal '94110; San Francisco; Good Eggs HQ'

  it 'formats location with just the address field', ->
    expect(formatLocation({address: 'hello world'})).to.equal 'hello world'

  it 'shortVague returns the short address', ->
    expect(formatLocation(location, 'shortVague')).to.equal '530 Hampshire Street, Suite 301'

  describe 'a vague address in the location', ->
    beforeEach ->
      location.vagueAddress = "Hampshire & Mariposa (by the slow club)"

    it 'shortVague returns vague address', ->
      expect(formatLocation(location, 'shortVague')).to.equal location.vagueAddress
