const { transformEvent, user, singleEvent } = require("./merge");
const Event = require("../../model/Event");
const Booking = require("../../model/Booking");

module.exports = {
  booking: (args, req) => {
    console.log(req.userId);
    if (!req.isAuth) {
      throw Error("User Not Authanticated!");
    }
    return Booking.find({ user: `${req.userId}` })
      .then((result) => {
        console.log(result);
        return result.map((item) => {
          return {
            _id: item._id,
            event: singleEvent.bind(this, item.event),
            user: user.bind(this, item.user),
            createdAt: new Date(item.createdAt).toISOString(),
            updatedAt: new Date(item.updatedAt).toISOString(),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  bookEvent: (args, req) => {
    if (!req.isAuth) {
      throw Error("User Not Authanticated!");
    }
    const eventId = args.eventId;
    return Event.findById(eventId)
      .then((event) => {
        if (!event) {
          throw new Error("Event not found");
        } else {
          const booking = new Booking({
            event: eventId,
            user: req.userId,
          });
          return booking.save();
        }
      })
      .then((result) => {
        console.log(result);
        return {
          _id: result._id,
          event: singleEvent.bind(this, result.event),
          user: user.bind(this, result.user),
          createdAt: new Date(result.createdAt).toISOString(),
          updatedAt: new Date(result.updatedAt).toISOString(),
        };
      })
      .catch((err) => {
        throw err;
      });
  },
  cancelBooking: (args, req) => {
    if (!req.isAuth) {
      throw Error("User Not Authanticated!");
    }
    return Booking.findByIdAndDelete(args.bookingId)
      .populate("event")
      .then((result) => {
        if (!result) {
          throw new Error("Booking of event not found");
        } else {
          return transformEvent(result.event);
        }
      })
      .catch((err) => {
        throw err;
      });
  },
};
