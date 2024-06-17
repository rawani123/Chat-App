import Message from "../models/message.model.js"

const addMessage =(req, res) => {
    try {
        const {from ,to ,message} = req.body
        const newMessage = new Message({
            message: {
                text: message
            },
            users: [from, to],
            sender: from
        })
        newMessage.save()
        if(newMessage){
            return res.status(201).send({success: true, message: "Message sent successfully"})
        }
        return res.status(400).send({success: false, message: "Message not sent"})
    } catch (error) {
        return res.status(500).send({success: false, message: "Internal server error"})
    }
}

const getAllMessages =async (req, res) => {
    try {
        const {from, to} = req.body
        const messages = await Message.find({users: {$all: [from, to]}}).sort({updatedAt: 1})
        
        const projectedMessages = messages.map(message => {
            return {
                fromSelf:message.sender.toString() === from,
                message:message.message.text    
            }
        })
        return res.status(200).send({success: true, messages: projectedMessages})
    } catch (error) {
        return res.status(500).send({success: false, message: "Internal server error"})
    }
}

export { addMessage, getAllMessages}