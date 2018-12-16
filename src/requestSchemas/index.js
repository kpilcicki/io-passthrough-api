import Joi from 'joi';

export const loginSchema = Joi.object().keys({
    login: Joi.string().regex(/^\d+$/).required(),
    password: Joi.string().required()
});

export const voteSchema = Joi.object().keys({
    voterId: Joi.number().positive().integer().required(),
    candidateId: Joi.number().positive().integer().required(),
    ballotId: Joi.number().positive().integer().required()
});

