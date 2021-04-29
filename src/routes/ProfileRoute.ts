import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import ProfileDao, { CreateStatus } from '@daos/Profile/ProfileDao';
import { paramMissingError, profileAlreadyExist, profileNotFound, errorUnexpected } from '@shared/constants';
import Profile, { IProfile } from '@entities/Profile';

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
        return res.status(BAD_REQUEST).json({ error: paramMissingError });
    }
    const newProfile = new Profile(loginData.nickname)
    profileDao.create(newProfile, function(createStatus: CreateStatus) {
        switch (createStatus) {
            case CreateStatus.EXISTS: {
                return res.status(BAD_REQUEST).json({ error: profileAlreadyExist });
            }
            case CreateStatus.SUCCESS: {
                return res.status(CREATED).json({newProfile});
            }
            case CreateStatus.FAIL: {
                return res.status(BAD_REQUEST).json({ error: errorUnexpected });
            } 
            default: {
                return res.status(BAD_REQUEST).json({ error: errorUnexpected });
            }
        }
    });  
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
    profileDao.get(nickname, function(profile: IProfile | null) {
        if (profile != null) {
            return res.status(OK).json({ profile });
        } else {
            return res.status(BAD_REQUEST).json({ error: profileNotFound });
        }
    });
}

/**
 * Update profile.
 * 
 * @param req Profile
 * @param res OK
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
