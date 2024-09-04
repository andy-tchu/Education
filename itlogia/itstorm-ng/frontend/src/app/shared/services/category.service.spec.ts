import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { environment } from '../../../environments/environment';
import { CategoryType } from '../../types/category.type';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch categories', () => {
    const dummyCategories: CategoryType[] = [
      { id: '1', name: 'Category 1', url: 'category-1' },
      { id: '2', name: 'Category 2', url: 'category-2' }
    ];

    service.getCategories().subscribe(categories => {
      expect(categories.length).toBe(2);
      expect(categories).toEqual(dummyCategories);
    });

    const req = httpMock.expectOne(`${environment.api}categories`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCategories);  // Simulate returning mock data
  });
});
