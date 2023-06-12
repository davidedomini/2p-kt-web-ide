module.exports = (app) => {
    var controller = require('../controllers/controller')
    const bodyParser = require('body-parser');
    const jsonParser = bodyParser.json();

    app
        .route('/api/signup')
        .post(jsonParser, controller.signup)

    app 
        .route('/api/signin')
        .post(jsonParser, controller.signin)

    app
        .route('/api/solveAll')
        .post(jsonParser, controller.solveAll)

    app
        .route('/api/solveNext')
        .post(jsonParser, controller.solveNext)
}