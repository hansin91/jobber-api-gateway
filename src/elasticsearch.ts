import { winstonLogger } from '@hansin91/jobber-shared';
import { Logger } from 'winston';
import { config } from '@gateway/config';
import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'apiGatewayElasticSearchConnection', 'debug');

class ElasticSearch {
  private elasticSearchClient: Client;

  constructor() {
    this.elasticSearchClient = new Client({
      node: `${config.ELASTIC_SEARCH_URL}`,
      auth: {
        username: config.ELASTIC_SEARCH_USERNAME,
        password: config.ELASTIC_SEARCH_PASSWORD
      },
    });
  }

  public async checkConnection(): Promise<void> {
    let isConnected = false;
    while(!isConnected) {
      log.info('GatewayService connecting to ElasticSearch');
      try {
        const health: ClusterHealthResponse = await this.elasticSearchClient.cluster.health({});
        log.info(`GatewayService ElasticSearch health status - ${health.status}`);
        isConnected = true;
      } catch (error) {
        log.error('Connecting to ElasticSearch failed. Retrying...');
        log.log('error', 'GatewayService checkConnection() method error:', error);
      }
    }
  }
}

export const elasticSearch: ElasticSearch = new ElasticSearch();