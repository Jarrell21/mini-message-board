const asyncHandler = require("express-async-handler");

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

const getMessageById = asyncHandler(async (req, res, next) => {
  const messageId = req.params.id;
  const message = messages.find((message) => message.id == messageId);

  if (!message) {
    next(new Error("Message not found"));
  }

  res.render("messageDetail", { message: message });
});

const getMessages = asyncHandler(async (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

const getNewMessageForm = asyncHandler(async (req, res) => {
  res.render("newMessage");
});

const validateMessage = (req, res, next) => {
  const { messageText, messageUser } = req.body;

  if (messageText === "" || messageUser === "") {
    return res.send(`
      <script>
        alert("Message text and author name are required.");
        window.history.back();
      </script>
    `);
  }

  next();
};

const createNewMessage = asyncHandler(async (req, res) => {
  const { messageText, messageUser } = req.body;

  const maxId = messages.reduce(
    (max, message) => (message.id > max ? message.id : max),
    0
  );

  const newMessage = {
    id: maxId + 1,
    text: messageText,
    user: messageUser,
    added: new Date(),
  };

  messages.push(newMessage);

  res.redirect("/");
});

module.exports = {
  getMessageById,
  getMessages,
  getNewMessageForm,
  validateMessage,
  createNewMessage,
};
