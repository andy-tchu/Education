import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RequestService } from './request.service';
import { environment } from '../../../environments/environment';
import { DefaultResponseType } from '../../types/default-response.type';

describe('RequestService', () => {
  let service: RequestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RequestService]
    });
    service = TestBed.inject(RequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a request', () => {
    const dummyResponse: DefaultResponseType = { error: false, message: 'Request created successfully' };
    const name = 'John Doe';
    const phone = '123-456-7890';
    const serviceType = 'Website Development';

    service.createRequest(name, phone, serviceType).subscribe(response => {
      expect(response.error).toBeFalse();
      expect(response.message).toBe('Request created successfully');
    });

    const req = httpMock.expectOne(`${environment.api}requests`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name,
      phone,
      service: serviceType,
      type: 'order'
    });
    req.flush(dummyResponse);  // Simulate returning mock data
  });

  it('should create a consultation', () => {
    const dummyResponse: DefaultResponseType = { error: false, message: 'Consultation request created successfully' };
    const name = 'Jane Doe';
    const phone = '098-765-4321';

    service.createConsultation(name, phone).subscribe(response => {
      expect(response.error).toBeFalse();
      expect(response.message).toBe('Consultation request created successfully');
    });

    const req = httpMock.expectOne(`${environment.api}requests`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name,
      phone,
      type: 'consultation'
    });
    req.flush(dummyResponse);  // Simulate returning mock data
  });
});
