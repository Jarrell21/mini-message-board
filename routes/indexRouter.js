const { Router } = require("express");
const indexRouter = Router();
const messageController = require("../controllers/messageController");

indexRouter
  .get("/", messageController.getMessages)
  .get("/new-message", messageController.getNewMessageForm)
  .get("/messages/:id", messageController.getMessageById)
  .post(
    "/new-message",
    messageController.validateMessage,
    messageController.createNewMessage
  );

module.exports = indexRouter;
