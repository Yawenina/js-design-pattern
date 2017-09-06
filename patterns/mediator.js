// memebers
function Participant(name) {
  this.name = name;
  this.chatroom = null;
  this.messages = [];
}

Participant.prototype = {
  send(message, to) {
    this.chatroom.send(message, this, to);
  },
  recieve(message, from) {
    this.messages.push(`${from.name} to ${this.name}: ${message}`);
    return `${from.name} to ${this.name}: ${message}`;
  },
};

Participant.prototype.constructor = Participant;

// mediator
const chatroom = {
  participants: {},
  register(participant) {
    this.participants[participant.name] = participant;
    participant.chatroom = this;
  },
  send(message, from, to) {
    if (to) {
      to.recieve(message, from);
    } else {
      const participants = this.participants;
      for (const key in participants) {
        if (participants[key] !== from) {
          participants[key].recieve(message, from);
        }
      }
    }
  },
};

export { Participant, chatroom };
