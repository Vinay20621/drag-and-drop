const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User=require("./models/user")
const jwt=require("jsonwebtoken")

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if the user already exists
                const existingUser = await User.findOne({ googleId: profile.id });
				console.log({existingUser})
                let token=""
                if (!existingUser) {
                    // If the user doesn't exist, create a new user
                    const user = new User({ googleId: profile?.id, firstName: profile?.displayName || "unKnown" });
                    await user.save();
					token = jwt.sign({ id: user._id ,name:user.firstName}, process.env.KEY, { expiresIn: '1h' });
                }else{
					token = jwt.sign({ id: existingUser._id ,name:existingUser.firstName}, process.env.KEY, { expiresIn: '1h' });
				}
                done(null, { token });
            } catch (error) {
               console.log({error})
                done(error);
            }
        }
    )
);


passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});