import { Message } from "../models/Message.js";

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Name, email, subject, and message are all required."
      });
    }

    const savedMessage = await Message.create({
      name,
      email,
      subject,
      message
    });

    return res.status(201).json({
      message: "Message saved successfully.",
      submission: savedMessage
    });
  } catch (error) {
    return next(error);
  }
};
