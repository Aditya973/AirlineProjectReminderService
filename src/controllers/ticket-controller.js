const ticketService = require('../services/email-service');

const create = async (req, res) => {
    try {
        const response = await ticketService.createNotification(req.body);
        return res.status(201).json({
            data: response,
            success: true,
            message: 'successfully registered an email reminder',
            err: {}
        });

    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            message:'failed to register the email reminder',
            err: error
        })
    }

}

module.exports = {
    create
}