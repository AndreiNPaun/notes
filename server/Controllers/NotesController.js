const Notes = require('../Models/Notes');

const { getUserIDFromToken } = require('../middleware/UserIDToken');

// lists all notes which are connected to the logged on user id
const list = async (req, res, next) => {
  try {
    const id = getUserIDFromToken(req.headers.authorization);

    const response = await Notes.find({ user_id: id });
    res.json({
      response,
    });
  } catch (error) {
    res.json({
      message: `Error occured ${error}`,
    });
  }
};

// write notes
const write = async (req, res, next) => {
  try {
    const notes = new Notes({
      note: req.body.note,
      user_id: getUserIDFromToken(req.headers.authorization),
    });

    await notes.save();
    res.json({ message: 'Note added.' });
  } catch (error) {
    res.json({ message: `An error has occured: ${error}` });
  }
};

// deletes notes but only if the user id stored on the note matches the user id in the token
const purge = async (req, res, next) => {
  try {
    const noteID = req.body.id;

    await Notes.findOneAndRemove({ _id: noteID });
    res.json({
      message: `Note has been deleted. ${noteID}`,
    });
  } catch (error) {
    res.json({
      message: `An error has occured: ${error}`,
    });
  }
};

module.exports = {
  list,
  write,
  purge,
};
