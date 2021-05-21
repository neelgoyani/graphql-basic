const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: (args) => {
    return User.findOne({ email: args.userInput.email })
      .then((user) => {
        if (user) {
          throw new Error("User Exist already.");
        } else {
          return bcrypt.hash(args.userInput.password, 15);
        }
      })
      .then((hashedPassword) => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword,
        });
        return user.save().then((result) => {
          console.log(result);
          return { _id: result._id, email: result.email, password: null };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  login: async ({ email, password }) => {
    const user2 = await User.findOne({ email: email });
    try {
      if (!user2) {
        throw new Error("User Not Exist!");
      } else {
        const isEqual = await bcrypt.compare(password, user2.password);
        if (!isEqual) {
          throw Error("Password Not Matched!");
        } else {
          // console.log(user2);
          const token = await jwt.sign(
            { userId: user2._id, email: user2.email },
            "9879207104",
            {
              expiresIn: "1h",
            }
          );
          return {
            userId: user2._id,
            token: token,
            tokenExpiration: 1,
          };
        }
      }
    } catch (err) {
      throw err;
    }
  },
};
