import * as fs from 'fs';
import * as path from 'path';
import { JSONPath } from 'jsonpath-plus';

export class Api {
  protected apiRoot = '/api/v3';
  protected localUserData = 'playwright/.auth/user.json';
  protected _accessToken: string = '';
  constructor(protected baseUrl: string ) {}
  loadJson<T = any>(relativePath: string): T {
    const fullPath = path.resolve(process.cwd(), relativePath);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(fileContent) as T;
  }

  get accessToken() {
    if (!this._accessToken) {
      const json = this.loadJson(this.localUserData);
      this._accessToken = JSONPath({
        path: '$..[?(@.name=="accessToken")].value',
        json,
      });
    }
    return this._accessToken;
  }
}
