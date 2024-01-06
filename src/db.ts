import { openDatabase, enablePromise } from "react-native-sqlite-storage";
import type { ResultSet, SQLiteDatabase } from "react-native-sqlite-storage";

export async function connectDb(databaseName: string): Promise<SQLiteDatabase> {
  enablePromise(true);
  const db = await openDatabase({
    name: databaseName,
    location: "default",
  });

  return db;
}

export async function executeQuery(
  database: SQLiteDatabase,
  query: string,
  params?: unknown[]
): Promise<ResultSet> {
  const [result] = await database.executeSql(query, params);
  return result;
}

export const DATABASE_NAME = "ExchangeDB";

export const TABLE_NAME = "exchange_table";
