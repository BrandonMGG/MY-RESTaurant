import { TestBed } from '@angular/core/testing';

import { RoutguardGuard } from './routguard.guard';

describe('RoutguardGuard', () => {
  let guard: RoutguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoutguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
