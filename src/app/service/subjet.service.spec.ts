/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubjetService } from './subjet.service';

describe('Service: Subjet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubjetService]
    });
  });

  it('should ...', inject([SubjetService], (service: SubjetService) => {
    expect(service).toBeTruthy();
  }));
});
