import { NotFoundException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BikeRepository {
  constructor(private db: DatabaseService) {}

  findAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.getDB().all('SELECT * FROM bikes', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  findById({ id }: { id: number }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .getDB()
        .get('SELECT * FROM bikes WHERE id = ?', [id], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
    });
  }

  existsOrThrow({ id }: { id: number }): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db
        .getDB()
        .get('SELECT * FROM bikes WHERE id = ?', [id], (err, row) => {
          if (err) {
            return reject(err);
          } else if (row === undefined) {
            return reject(
              new NotFoundException(`Bike with ID ${id} not found`),
            );
          } else {
            resolve(undefined); // Returns true if a row exists
          }
        });
    });
  }

  async create({
    make,
    model,
    year,
    type,
  }: {
    make: string;
    model: string;
    year: number;
    type: string;
  }): Promise<any> {
    const id: number = await new Promise((resolve, reject) => {
      this.db
        .getDB()
        .run(
          'INSERT INTO bikes (make, model, year, type) VALUES (?, ?, ?, ?)',
          [make, model, year, type],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(this.lastID);
            }
          },
        );
    });
    return this.findById({ id });
  }

  async update({
    id,
    make,
    model,
    year,
    type,
  }: {
    id: number;
    make?: string;
    model?: string;
    year?: number;
    type?: string;
  }): Promise<void> {
    await this.existsOrThrow({ id });
    await new Promise((resolve, reject) => {
      this.db.getDB().run(
        `
        UPDATE bikes 
        SET 
            make = COALESCE(?, make), 
            model = COALESCE(?, model), 
            year = COALESCE(?, year), 
            type = COALESCE(?, type) 
        WHERE id = ?`,
        [make, model, year, type, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(undefined);
          }
        },
      );
    });
    return this.findById({ id });
  }

  async delete({ id }: { id: number }): Promise<void> {
    await this.existsOrThrow({ id });
    const row = await this.findById({ id });
    await new Promise((resolve, reject) => {
      this.db
        .getDB()
        .run(`DELETE FROM bikes WHERE id = ?`, [id], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(undefined);
          }
        });
    });
    return row;
  }
}
