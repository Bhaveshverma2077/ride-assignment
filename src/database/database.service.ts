import * as sqlite3 from 'sqlite3';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private db: sqlite3.Database;

  async onModuleInit() {
    this.db = await this.connectToDatabase();
    await this.initializeDatabase();
  }

  private connectToDatabase(): Promise<sqlite3.Database> {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database('app.db', (err) => {
        if (err) {
          console.error('DATABASE CONNECTION FAILED:', err.message);
          reject(err);
        } else {
          console.log('DATABASE CONNECTED');
          resolve(db);
        }
      });
    });
  }

  private initializeDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.exec(
        `
        CREATE TABLE IF NOT EXISTS bikes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          make TEXT NOT NULL,
          model TEXT NOT NULL,
          year INTEGER NOT NULL,
          type TEXT NOT NULL
        )
      `,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }

  getDB() {
    return this.db;
  }

  // Close the database connection if needed
  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
