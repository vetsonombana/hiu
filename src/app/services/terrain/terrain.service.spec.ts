import { TestBed } from '@angular/core/testing';

import { TerrainService } from './terrain.service';

describe('TerrainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TerrainService = TestBed.get(TerrainService);
    expect(service).toBeTruthy();
  });
});
