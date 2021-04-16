import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import ProfileDao from '@daos/Profile/ProfileDao.mock';
import { paramMissingError, profileAlreadyExist, profileNotFound } from '@shared/constants';
import Profile from '@entities/Profile';

const profileDao = new ProfileDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


/**
 * get exists profile or create new one.
 * 
 * @param req LoginData
 * @param res Profile
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
    
    let profile = await profileDao.get(loginData.nickname)
    if (profile != null) {
        return res.status(OK).json({profile});
    } else {
        profile = new Profile(loginData.nickname)
        await profileDao.create(profile);
        return res.status(CREATED).json({profile});
    }
}

/**
 * create profile.
 * 
 * @param req Profile
 * @param res 200
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
 * @param req Profile
 * @param res Profile
 * @returns 
 */
 export async function get(req: Request, res: Response) {
    const { nickname } = req.params;
    if (nickname.length == 0) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    
    let profile = await profileDao.get(nickname);
    if (profile != null) {
        return res.status(OK).json({profile});
    } else {
        return res.status(BAD_REQUEST).json({
            error: profileNotFound,
        });
    }
}

/**
 * Update profile.
 * 
 * @param req Profile
 * @param res 200
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
