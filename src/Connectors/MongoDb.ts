export class MongoConnector {
  connection
  
  constructor(connection: any) {
    this.connection = connection;
  } closeConnection() {
    this.connection.close();
  } collection(collectionName) {
    // caching, batching and logging could be added here
    return connection.collection(connectionName);
  }
}