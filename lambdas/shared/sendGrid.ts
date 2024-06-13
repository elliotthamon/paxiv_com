import type { NextApiRequest, NextApiResponse } from 'next'
import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY!)

export default async function sendGrid(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { to, from } = req.body
  if (!(to || from)) throw new Error('Bad body')

  const msg = req.body;
  sendgrid.send(msg)
    .then(() => {
      res.send(true)
    })
    .catch((err) => {
      console.log('err', err)
      res.send(false)
    });
}
