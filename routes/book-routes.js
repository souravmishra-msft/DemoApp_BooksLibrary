const router = require('express').Router();
const passport = require('passport');
const BearerStrategy = require('passport-azure-ad').BearerStrategy;

const authConfig = require('../config/authConfig.json');
const booksController = require('../controllers/books-controller');


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

router.get('/listBooks', passport.authenticate("oauth-bearer", { session: false }), booksController.listBooks);
router.post('/addBook', passport.authenticate("oauth-bearer", { session: false }), booksController.addBook);
router.get('/getBook/:id', passport.authenticate("oauth-bearer", { session: false }), booksController.getBook);
router.put('/updateBook/:id', passport.authenticate("oauth-bearer", { session: false }), booksController.updateBook);
router.delete('/deleteBook/:id', passport.authenticate("oauth-bearer", { session: false }), booksController.deleteBook);




module.exports = router;