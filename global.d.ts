declare global {
  type MongooseConn = {
    conn: any;
    promise: null | Promise<any>;
  };
  var mongoose: MongooseConn;
}

export {};
