var Yelp = require('yelp');

var yelpQuery = new Yelp({
  consumer_key: process.env.yelp_consumer_key,
  consumer_secret: process.env.yelp_consumer_secret,
  token: process.env.yelp_token,
  token_secret: process.env.yelp_token_secret
});

function yelpSearch(locationSearch, tripId) {
  var tripId = tripId;
  return yelpQuery.search({ location: locationSearch })
    .then(function(data) {
      var businessEntry = [];
      data.businesses.forEach(function(business) {
        businessEntry.push({
          name: business.name,
          rating: business.rating,
          stars: business.rating_img_url_small,
          address: business.location.display_address,
          image: business.image_url,
          description: business.snippet_text,
          tripId: tripId,
          categories: business.categories
        });
      });

      return businessEntry;
    })
    .catch(function(err) {
      return err;
    });
};

module.exports = {
  yelpSearch: yelpSearch
};
