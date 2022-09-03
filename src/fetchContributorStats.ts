/*
 * This file is part of the Github Contributor Stats.
 *
 * (c) TaehyunHwang <eeht1717@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as dotenv from 'dotenv';
import axios from 'axios';

/**
 * The Fetch Contributor Stats Function.
 *
 * This function holds the request for the github graphql APIs.
 *
 * @param {String} username The target github username for contribution stats.
 *
 * @return {*}
 */
const fetchContributorStats = async (username) => {
  try {
    const response = await axios({
      url: 'https://api.github.com/graphql',
      method: 'POST',
      headers: {
        Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
      data: {
        query: `query {
                  user(login: "${username}") {
                    id
                    repositoriesContributedTo(first :100, contributionTypes: COMMIT) {
                      totalCount
                      nodes {
                        owner {
                          id
                          avatarUrl
                        }
                        isInOrganization
                        url
                        homepageUrl
                        name
                        nameWithOwner
                        stargazerCount
                        openGraphImageUrl
                      }
                    }
                  }
                }`,
      },
    });

    if (response.status === 200) {
      return response.data.data.user.repositoriesContributedTo.nodes;
    }

    return {};
  } catch (error) {
    console.error(error);
    return error;
  }
};

export { fetchContributorStats };
