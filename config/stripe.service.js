const stripe = require('stripe')('ca_OIVK0DK3T2ASKZwbyGwNhUXAdUgjCIeY');



exports.authorizeAccount = async function(req, res) {
  const query = req.query

  try {
      const response = await stripe.oauth.token({
          grant_type: 'authorization_code',
          code: query.code
      })

      console.log(response.stripe_user_id)
      res.redirect("customURLTORedirect")
  } catch (error) {
      console.log(error)
      res.redirect("customURLTORedirect")
  }
  };