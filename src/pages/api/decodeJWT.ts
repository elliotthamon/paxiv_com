import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import {TokenExpiredError} from 'jsonwebtoken'

interface JWTPayload {
  id: string,
  email: string,
  role: string,
  approval: string,
  companyID: string,
  companyAvatar: string
}

export default async function decodeJWT (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {token} = req.body

    if (!token ) throw new Error('Bad body') ;
    const decodedData = jwt.verify(token, 'paxiv');
    const { id, email, role, approval, companyID, companyAvatar}= decodedData as JWTPayload;
    const result = {id, email, role, approval, companyID, companyAvatar}
    res.send({data: result, status: true})
  } catch(error) {
    let message = ''
    if (error instanceof TokenExpiredError) {
      message = 'Token expired, Please sign in again'
    }
    console.log(`/api/decodeJWT ${error}`)
    res.send({data: { message } , status: false})
  }
}
