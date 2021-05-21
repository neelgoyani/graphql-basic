const { transformEvent } = require("./merge");
const Event = require("../../model/Event");
const User = require("../../model/User");

module.exports = {
  events: () => {
    return Event.find()
      .then((result) => {
        console.log(result);
        return result.map((item) => {
          return transformEvent(item);
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  createEvent: (args, req) => {
    console.log(req.isAuth);
    if (!req.isAuth) {
      throw Error("User is not Authonticated");
    }
    const event = new Event({
      title: args.InputEvent.title,
      description: args.InputEvent.description,
      price: args.InputEvent.price,
      date: args.InputEvent.date,
      creator: req.userId,
    });
    let createdEvent;
    return event
      .save()
      .then((item) => {
        createdEvent = transformEvent(item);
        return User.findById(item.creator);
      })
      .then((user1) => {
        if (!user1) {
          throw new Error("User Not found!");
        } else {
          user1.createdEvent.push(event);
          user1.save();
        }
      })
      .then((result) => {
        return createdEvent;
      })
      .catch((err) => {
        throw err;
      });
  },
};
