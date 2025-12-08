import * as friendServices from "../../prisma/services/frinedService.js";

export const addFriend = async (req, res) => {
  try {
    const receiverId = parseInt(req.params.receiverId);
    const senderId = parseInt(req.id);

    if (!receiverId) res.status(401).json({ msg: "Something is missing" });

    if (senderId === receiverId) {
      res.status(200).json({ mag: "U are already friend" });
      return;
    }

    await friendServices.addFriend(senderId, receiverId);

    res.status(200).json({
      msg: "Request Send succfully ",
    });
  } catch (error) {
    res.status(500).json({
      error: `The request fails with error ${error}`,
    });
  }
};

export const accept = async (req, res) => {
  try {
    const receiverId = parseInt(req.id);
    const senderId = parseInt(req.params.senderId);
    if (!senderId) res.status(401).json({ msg: "Something is missing" });

    await friendServices.acceptReq(senderId, receiverId);

    const conversion = await friendServices.crateConversionID("", false);

    const participant = [
      {
        conversationId: conversion.id,
        userId: receiverId,
      },
      {
        conversationId: conversion.id,
        userId: senderId,
      },
    ];

    const response = await friendServices.conversionParticipant(participant);

    res.status(200).json({
      msg: "You are friend  now !!!",
    });
  } catch (error) {
    res.status(500).json({
      error: `The request fails with error ${error}`,
    });
  }
};

export const removeFriend = async (req, res) => {
  try {
    const userID = parseInt(req.id);
    const friendID = parseInt(req.params.friendID);

    await friendServices.removeFriend(userID, friendID);

    res.status(200).json({
      msg: "You are no loggere friend ",
    });
  } catch (error) {
    res.status(500).json({
      msg: `Someting went wrong ${error}`,
    });
  }
};

export const getAllFriend = async (req, res) => {
  try {
    const userID = parseInt(req.id);
    const friend = await friendServices.getAllFriend(userID);

    res.status(200).json({
      friend,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const getPendingRequest = async (req, res) => {
  try {
    const userID = parseInt(req.id);

    const pendingRequest = await friendServices.getPendingRequest(userID);

    res.status(200).json({
      pendingRequest,
    });
  } catch (error) {
    res.status(500).json({
      error: `something  went wrong ${error}`,
    });
  }
};

export const getNotAccepeted = async (req, res) => {
  try {
    const userID = parseInt(req.id);

    const notAccepeted = await friendServices.getNotAccepeted(userID);
    res.status(200).json({
      notAccepeted,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error is ${error}`,
    });
  }
};

export const existingConversation = async (userId, receiverId) => {
  try {
    const conversationId = await friendServices.existingConversation(
      userId,
      receiverId
    );
    if (conversationId) return conversationId;
  } catch (error) {
    return error;
  }
};
