const router = require('express').Router();
const passport = require('passport');
const BearerStrategy = require('passport-azure-ad').BearerStrategy;

const authConfig = require('../config/authConfig.json');
const wishlistController = require('../controllers/wishlist-controller');

// -------------------------------------------------------
// Preparing for BearerStrategy
// -------------------------------------------------------
const options = {
    identityMetadata: `https://${authConfig.metadata.authority}/${authConfig.credentials.tenantID}/${authConfig.metadata.version}/${authConfig.metadata.discovery}`,
    issuer: `https://${authConfig.metadata.authority}/${authConfig.credentials.tenantID}/${authConfig.metadata.version}`,
    clientID: authConfig.credentials.clientID,
    audience: authConfig.credentials.audience,
    validateIssuer: authConfig.settings.validateIssuer,
    passReqToCallback: authConfig.settings.passReqToCallback,
    loggingLevel: authConfig.settings.loggingLevel,
}

const bearerStrategy = new BearerStrategy(options, (token, done) => {
    done(null, {}, token);
});

// console.log(bearerStrategy);
passport.use(bearerStrategy);

router.get('/getWishList', passport.authenticate("oauth-bearer", { session: false }), wishlistController.getWishlistItems);
router.post('/addToWishList', passport.authenticate("oauth-bearer", { session: false }), wishlistController.addToWishlist);
router.delete('/deleteFromWishList', passport.authenticate("oauth-bearer", { session: false }), wishlistController.deleteWishlistItem);


module.exports = router;