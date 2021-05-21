const Event = require("../../model/Event");
const User = require("../../model/User");

const events = (eventIds) => {
  return Event.find({ _id: eventIds })
    .then((result) => {
      return result.map((item) => {
        return transformEvent(item);
      });
    })
    .catch((err) => {
      throw err;
    });
};

const singleEvent = (eventId) => {
  return Event.findById(eventId)
    .then((result) => {
      return transformEvent(result);
    })
    .catch((err) => {
      throw err;
    });
};

const user = (userid) => {
  return User.findById(userid)
    .then((user) => {
      return {
        _id: user._id,
        email: user.email,
        createdEvent: events.bind(this, user.createdEvent),
        password: null,
      };
    })
    .catch((err) => {
      throw err;
    });
};

const transformEvent = (event) => {
  return {
    _id: event._id,
    title: event.title,
    description: event.description,
    price: event.price,
    date: event.date,
    creator: user.bind(this, event.creator),
  };
};

exports.transformEvent = transformEvent;
exports.user = user;
exports.events = events;
exports.singleEvent = singleEvent;
