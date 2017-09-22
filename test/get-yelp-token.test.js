const getYelpToken = require('../server/lib/get-yelp-token');
const config = require('../config/config');

describe('getYelpToken()', () => {
  it('Returns a string', async () => {
    const token = await getYelpToken(config.yelpID, config.yelpSecret);
    expect(typeof token).toBe('string');
  });
});
