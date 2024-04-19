/* eslint-disable indent */


import { StatusCodes } from 'http-status-codes'
import { InvitationService } from '~/services/invitationService'

const createNewBoardInvitation = async (req, res) => {
    try {
        const userId = req.jwtDecoded._id
        const result = await InvitationService.createNewBoardInvitation(req.body, userId)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const getInvitations = async (req, res) => {
    try {
        const userId = req.jwtDecoded._id
        const result = await InvitationService.getInvitations(userId)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const updateBoardInvitation = async (req, res) => {
    try {
        const { invitationId } = req.params
        const { action } = req.body
        const userId = req.jwtDecoded._id

        const result = await InvitationService.updateBoardInvitation(userId, invitationId, action)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

export const InvitationController = {
    createNewBoardInvitation,
    getInvitations,
    updateBoardInvitation
}
