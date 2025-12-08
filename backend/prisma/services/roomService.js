import prisma from "../index.js";

export const createPlan = async (
  destination,
  travelDate,
  timeSlot,
  userId,
  minAge,
  maxAge,
  grpSize,
  decp,
  Categories,
  Duration,
  Difficulty,
  image
) => {
  return await prisma.travelPlan.create({
    data: {
      destination,
      travelDate,
      timeSlot,
      createdById: userId,
      minAge,
      maxAge,
      grpSize,
      decp,
      Categories,
      Duration,
      Difficulty,
      image
    },
  });
};

export const getPlanById = async (planId) => {
  return await prisma.travelPlan.findFirst({
    where: {
      id: planId,
    },
  });
};


export const leavePlan = async (planId ,userId) => {
  return await prisma.travelPlanMembers.delete({
    where: { 
      memberId_travelPlanId : {
        memberId : userId,
        travelPlanId : planId
      }
     },
  });
};

export const getPlan = async (planId) => {
  return await prisma.travelPlan.findUnique({
    where: { id: planId },
    include: {
      members: true, // Get all users in the room
      user: true, // Get the admin details
    },
  });
};

export const addMemberTotravelPlan = async (planId, user) => {
  return await prisma.travelPlanMembers.create({
    data: {
      memberId: user,
      travelPlanId: planId,
    },
  });
};

export const getMemebers = async (planId) => {
  return await prisma.travelPlanMembers.findMany({
    where: {
      travelPlanId: planId,
    },
  });
};

export const getAllplans = async (viewerId) => {
  return await prisma.travelPlan.findMany({
    include: {
      user: true, // creator of the plan

      members: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              profileImage: true,
              Address: true,

              // Check if viewer and this user are friends
              receivedRequests: {
                where: {
                  senderId: viewerId,
                 
                },
                select: { id: true,  isAccepted: true }
              },

              sentRequests: {
                where: {
                  receiverId: viewerId
                },
                select: { id: true ,  isAccepted: true}
              },
            },
          },
        },
      },
    },
  });
};

