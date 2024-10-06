import { Octokit } from 'octokit'

export type Repository = {
  name: string
  url: string
  description: string
  owned: boolean // If I own the repository
  isFork: string
  updatedAt: Date
  ownerName: string
  ownerUrl: string
}

type fetchRepositoriesResult = {
  repos: Repository[]
  afterCursor: string | null
  ok: boolean
}


const getAPIKey = (): string => {
  const api_key = process.env.API_KEY_GITHUB

  if (api_key == undefined) throw new Error('GITHUB API Key not found')

  return api_key
}


export const getRepositories = async (afterCursor: string | null, projectRepositoriesLength: number = 4 ): Promise<fetchRepositoriesResult> => {
  let api_key
  try {
    api_key = getAPIKey()
  } catch (e) {
    return {
      ok: false,
      afterCursor: null,
      repos: [],
    }
  }
  const octokit = new Octokit({ auth: api_key })

  // get logged in user
  const {
    viewer: { login },
  } = await octokit.graphql(`{
    viewer {
      login
    }
  }`) as { viewer: { login: string } }

  const {
    viewer: {
      repositories: { pageInfo, nodes },
    },
  } = await octokit.graphql(`{
  viewer {
    repositories(first: ${projectRepositoriesLength}, ${afterCursor ? `after:"${afterCursor}"` : ''} orderBy: {field: UPDATED_AT, direction: DESC}) {
      pageInfo {hasNextPage, endCursor}
      nodes {
        name
        url
        description
        isArchived
        isFork
        updatedAt
        owner {
          login
          url
        }
      }
    }
  }
}`) as {
    viewer: {
      repositories: {
        pageInfo: { hasNextPage: boolean; endCursor: string }
        nodes: {
          name: string
          url: string
          description: string
          isArchived: boolean
          isFork: boolean
          updatedAt: string
          owner: {
            login: string
            url: string
          }
        }[]
      }
    }
  }

  // FILTER ARCHIVED
  const repos: Repository[] = nodes
    .filter((repo: any) => !repo.isArchived)
    .map((repo: any) => ({
      name: repo.name,
      url: repo.url,
      description: repo.description,
      owned: repo.owner.login === login,
      isFork: repo.isFork,
      updatedAt: new Date(repo.updatedAt),
      ownerName: repo.owner.login,
      ownerUrl: repo.owner.url,
    }))

  return {
    repos,
    afterCursor: pageInfo.hasNextPage ? pageInfo.endCursor : null,
    ok: true,
  }
}
