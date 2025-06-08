import * as fs from 'fs';
import * as path from 'path';
import { JSONPath } from 'jsonpath-plus';

/*
  Api is a base class for classPes that access the Fieldwire API
  It retrieves an existing access token from the user.json file.

  I used axios as the http library, because I'm very familiar with the
  axios package.  I wasn't familiar with the Playwright API request methods.
  I tried a request.get, but was getting errors with the request.json() method.

  Given more time, I would try the Playwright HTTP client again.  This
  class would become unnecessary since Playwright manages logins.

  If I continued using this class, I would add a method to decode
  the JWT token to confirm the access token has not expired, and re-login if
  it's no longer valid.

 */
export class Api {
  protected apiRoot = '/api/v3';
  protected localUserData = 'playwright/.auth/user.json';
  protected _accessToken = '';
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
