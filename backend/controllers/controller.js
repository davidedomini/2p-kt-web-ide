exports.recentTheories = (req, res) => {
    console.log('Recent theories controller')
}

exports.signup = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let user = req.body.user;
    console.log(`Name: ${user.name}`);
    console.log(`Surname: ${user.surname}`);
    console.log(`Email: ${user.email}`);
    console.log(`Username: ${user.username}`);
    console.log(`Password: ${user.password}`);
}

exports.signin = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let user = req.body.user;
    console.log(`Username: ${user.username}`);
    console.log(`Password: ${user.password}`);
}

exports.authorization = (token, id) => {

}