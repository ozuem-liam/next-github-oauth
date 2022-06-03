import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Octokit } from '@octokit/rest'
import { type } from 'os'

type Data = {
  data?: string[],
  error?: string,
}

const page = 1
const per_page = 10

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req })
  if (session) {
  const octokit = new Octokit({
      auth: process.env.NEXT_PUBLIC_GITHUB_AUTH_TOKEN
  })
  const resp = await octokit.request('GET /user', {})
  if(resp) {
      const {data} = await octokit.request(`GET /users/{username}/repos?page=${page}&per_page=${per_page}`, {
        username: resp.data.login,
      })

      let newData = data.map((rep: { full_name: string }) => rep.full_name)

      res.status(200).json({ data: newData})
  }
  } else {
    res.status(401).json({ error: 'Permission Denied' })
  }
}