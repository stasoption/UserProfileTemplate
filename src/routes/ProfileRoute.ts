import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import ProfileDao from '@daos/Profile/ProfileDao';
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
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    
    profileDao.get(loginData.nickname, async function(profile: Promise<IProfile | null> | null) {
        if (profile != null) {
            return res.status(OK).json({profile});
        } else {
            const newProfile = new Profile(loginData.nickname)
            profileDao.create(newProfile, function(isSuccess: boolean) {
                if (isSuccess) {
                    return res.status(CREATED).json({newProfile});
                } else {
                    return res.status(BAD_REQUEST).json({ error: errorUnexpected });
                }
            });
        }
    });   
}

/**
 * create profile.
 * 
 * @param req Profile
 * @param res CREATED
 * @returns 
 */
 export async function create(req: Request, res: Response) {
    const { profile } = req.body;
    console.log(req.body);
    if (!profile) {
        return res.status(BAD_REQUEST).json({ error: paramMissingError });
    }
    
    profileDao.get(profile.nickname, function(iprofile: Promise<IProfile | null> | null) {
        console.log("IProfile:", iprofile);
        if (iprofile != null) {
            return res.status(BAD_REQUEST).json({ error: profileAlreadyExist, iprofile: Profile });
        } else {
            profileDao.create(profile, function(isSuccess: boolean) {
                if (isSuccess) {
                    console.log("isSuccess:", isSuccess);
                    return res.status(CREATED).end();
                } else {
                    return res.status(BAD_REQUEST).json({ error: errorUnexpected });
                }
            });
        }
    })
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
    profileDao.get(nickname, function(profile: Promise<IProfile | null> | null) {
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
