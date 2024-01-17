import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

import { Task } from './common/entities/task.entity';

@Injectable()
export class AppService {
  constructor(@Inject('PG') private pgClient: Client) {}

  getHello(): string {
    return 'Hello World!';
  }

  getTasks(): Promise<Task[]> {
    return new Promise((resolve, reject) =>
      this.pgClient.query('SELECT * FROM tasks', (err, res) =>
        err ? reject(err) : resolve(res.rows),
      ),
    );
  }
}
