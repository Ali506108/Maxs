const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Admin = require('./Admin');
const Employee = require('../employee/Employee'); // Убедитесь, что путь правильный

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'poka', // Замените на ваш секретный ключ
};

passport.use(new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
        let user;
        if (jwtPayload.role === 'admin') {
            user = await Admin.findByPk(jwtPayload.id);
            user.setDataValue('role', 'admin'); // Добавляем роль
        } else if (jwtPayload.role === 'employee') {
            user = await Employee.findByPk(jwtPayload.id);
            user.setDataValue('role', 'employee'); // Добавляем роль
        }

        if (user) {
            return done(null, user);
        } else {
            return done(null, false); // User not found
        }
    } catch (error) {
        return done(error, false); // Error occurred
    }
}));

module.exports = {
    jwtOptions,
};
