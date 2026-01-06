import prisma from "../index.js"


export const getMessage = async( conversationId ) => {
    return prisma.message.findMany({
        where : {
            conversationId,
        },
        orderBy: {
            createdAt: 'asc'
        },
        include : {
        seenBy : true
        }
    })
}

export const addMeassage = async(senderId , content  , conversationId  ) => {
    return prisma.message.create({
        data : {
            conversationId : conversationId,
            senderId : senderId,
            content : content
        }
    })
}

export const deleteMessage = async ( conversationId ) => {
    return prisma.message.deleteMany({
        where : {
            conversationId : conversationId
        }
    })
}