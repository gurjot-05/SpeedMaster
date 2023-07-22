const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    socketID: { type: String },
    isPartyLeader: { type: Boolean, default: false },
    WPM: { type: Number, default: -1 },
    nickName: { type: String },
    input: { type: String, default: "" },
    correctChars: { type: Number, default: 0 },
    isFinished: { type: Boolean }
});

const GameSchema = new mongoose.Schema({
    quote: { type: String },
    words: [{ type: String }],
    quoteLength: { type: Number },
    author: { type: String },
    isOpen: { type: Boolean, default: true },
    isOver: { type: Boolean, default: false },
    players: [PlayerSchema],
    startTime: { type: Number }
});

module.exports = mongoose.model('Game', GameSchema);
