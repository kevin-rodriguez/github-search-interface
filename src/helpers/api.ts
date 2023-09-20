import { MAX_REPOSITORY_COUNT } from '../constants/api';

export const fetchGithubRepositories = async (term: string) => {
	try {
		const authToken = import.meta.env.VITE_GITHUB_PERSONAL_TOKEN;
		const response = await fetch(`https://api.github.com/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`,
			},
			body: JSON.stringify({
				query: `
          {
            search(query: "${term}", type: REPOSITORY, first: ${MAX_REPOSITORY_COUNT}) {
              nodes {
                ... on Repository {
                  id
                  name
                }
              }
            }
          }
        `,
			}),
		});

		const data = await response.json();

		return data.data.search.nodes;
	} catch (error) {
		console.error('Error fetching repositories:', error);
	}

	return [];
};
