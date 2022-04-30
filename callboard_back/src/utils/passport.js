import {Strategy as JWTStrategy, ExtractJwt as ExtractJWT} from 'passport-jwt';
import {Strategy as LocalStrategy} from 'passport-local';
import passport from 'passport'
import dotenv from 'dotenv'

import Connect from "../models/db_models.js";
import {generateMD5} from "./MD5generator.js";

dotenv.config();


passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY
    },
    async (jwtPayload, done) => {
        try {
            const user = await Connect.models.User.findOne({
                where: {
                    id: jwtPayload.data.id
                },
                attributes: {
                    exclude: ['password']
                }
            });

            if (user) {
                done(null, user);
                return;
            }
            done(null, false);
        } catch (err) {
            done(err, false)
        }
    }
));

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await Connect.models.User.findOne({
                where: {
                    email: email
                },
                attributes: {
                    exclude: ['verified']
                }
            });

            if (!user) {
                done(null, user);
                return;
            }

            if (user.password === generateMD5(password)) {
                done(null, user);
                return;
            }

            console.log(user.get('password'));

            done(null, false);
        } catch (err) {
            done(err, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Connect.models.User.findOne({
        where: {
            id: id
        }
    }).then((user) => {
        if (user == null) {
            done(new Error('Wrong user id'), user);
        }
    });
});

export default passport;