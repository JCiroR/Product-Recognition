import { TestBed } from '@angular/core/testing';

import { ProductLoaderService } from './product-loader.service';

describe('ProductLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductLoaderService = TestBed.get(ProductLoaderService);
    expect(service).toBeTruthy();
  });
});
