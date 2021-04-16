import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import ProfileDao from '@daos/Profile/ProfileDao.mock';
import { paramMissingError, profileAlreadyExist } from '@shared/constants';

const profileDao = new ProfileDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


/**
 * get exists profile or create new one.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function login(req: Request, res: Response) {
    const { loginData } = req.body;
    console.log(req.body);
    if (!loginData) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    
    let localProfile = await profileDao.get(loginData.nickname)
    if (localProfile != null) {
        return res.status(OK).json({localProfile});
    } else {
        let newProfile = new Profile()
        await profileDao.create(newProfile);
        return res.status(CREATED).json({newProfile});
    }
}

/**
 * create profile.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function create(req: Request, res: Response) {
    const { profile } = req.body;
    console.log(req.body);
    if (!profile) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    
    let localProfile = await profileDao.get(profile.nickname)
    if (localProfile != null) {
        return res.status(OK).json({
            error: profileAlreadyExist,
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
    console.log(req.body);
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
    console.log(req.body);
    if (!profile) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await profileDao.update(profile);
    return res.status(OK).end();
}

function Profile(nickname: string) {
    throw new Error('Function not implemented.');
}
