import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import ProfileDao from '@daos/Profile/ProfileDao.mock';
import { paramMissingError } from '@shared/constants';

const profileDao = new ProfileDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


/**
 * create profile.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function create(req: Request, res: Response) {
    const { profile } = req.body;
    console.log(profile.nickname);
    
    if (!profile) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await profileDao.create(profile);
    return res.status(CREATED).end();
}

/**
 * get profile.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function get(req: Request, res: Response) {
    const { nickname } = req.params;
    if (!nickname) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    console.log(nickname);
    await profileDao.get(nickname);
    return res.status(OK).json({nickname});
}

/**
 * Update profile.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function update(req: Request, res: Response) {
    const { profile } = req.body;
    if (!profile) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await profileDao.update(profile);
    return res.status(OK).end();
}