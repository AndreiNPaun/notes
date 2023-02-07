const Notes = require('../Models/Notes');

const list = async (req, res, next) => {
  try {
    const response = await Notes.find();
    res.json({
      response,
    });
  } catch (error) {
    res.json({
      message: `Error occured ${error}`,
    });
  }
};

const write = async (req, res, next) => {
  try {
    const notes = new Notes({
      note: req.body.note,
      user_id: req.body.user_id,
    });

    await notes.save();
    res.json({ message: 'Note added.' });
  } catch (error) {
    res.json({ message: `An error has occured: ${error}` });
  }
};

module.exports = {
  list,
  write,
};
