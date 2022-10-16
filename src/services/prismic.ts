import * as prismic from '@prismicio/client';
import { HttpRequestLike } from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';

export interface PrismicConfig {
  req?: HttpRequestLike;
  apiEndpoint?: string;
}

export function getPrismicClient(config: PrismicConfig): prismic.Client {
  const apiEndpoint = config.apiEndpoint || process.env.PRISMIC_API_ENDPOINT;
  const client = prismic.createClient(apiEndpoint, {
    accessToken:
      'MC5ZMGM5MmhFQUFDSUFyb3Zm.aO-_vWbvv73vv73vv73vv71l77-977-9Nu-_ve-_ve-_vU4b77-977-977-977-977-9c--_vVQN77-9cFfvv73vv71TJg',
  });

  enableAutoPreviews({
    client,
    req: config.req,
  });

  return client;
}
