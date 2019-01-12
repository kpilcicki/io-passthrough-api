import Joi from 'joi';

export const loginSchema = Joi.object().keys({
    login: Joi.string().regex(/^\d+$/).required(),
    password: Joi.string().required()
}).required();

export const voteSchema = Joi.object().keys({
    candidateId: Joi.number().min(0).integer().required(),
    ballotId: Joi.number().min(0).integer().required()
}).required();

