import { TestBed } from '@angular/core/testing';

import { TokenExpiryService } from './token-expiry.service';

describe('TokenExpiryService', () => {
  let service: TokenExpiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenExpiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
