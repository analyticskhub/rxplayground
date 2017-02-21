/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StreamsService } from './streams.service';

describe('Service: Streams', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StreamsService]
    });
  });

  it('should ...', inject([StreamsService], (service: StreamsService) => {
    expect(service).toBeTruthy();
  }));
});
