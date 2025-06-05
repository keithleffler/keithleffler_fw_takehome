import {ProjectApi} from '../projects_api'

import { describe, it, expect } from '@jest/globals';

describe('Example Unit Test', () => {
  const url = "http://foo.bar"
  let projectApi: ProjectApi;
  beforeEach(() => {
    projectApi = new ProjectApi(url);
  })
  it('should create a ProjectApi instance', () => {
    expect(projectApi).not.toBeUndefined();
  });
});
