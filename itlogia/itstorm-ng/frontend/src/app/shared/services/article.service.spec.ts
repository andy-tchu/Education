import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService } from './article.service';
import { environment } from '../../../environments/environment';
import { ArticleCardType } from '../../types/article-card.type';
import { ArticleType } from '../../types/article.type';
import { ActiveParamsType } from '../../types/active-params.type';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService]
    });
    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch top articles', () => {
    const dummyArticles: ArticleCardType[] = [
      {
        id: '1',
        title: 'Article 1',
        description: 'Description 1',
        image: 'image1.jpg',
        date: '2023-01-01',
        category: 'Category 1',
        url: 'article-1'
      },
      {
        id: '2',
        title: 'Article 2',
        description: 'Description 2',
        image: 'image2.jpg',
        date: '2023-01-02',
        category: 'Category 2',
        url: 'article-2'
      }
    ];

    service.getTopArticles().subscribe(articles => {
      expect(articles.length).toBe(2);
      expect(articles).toEqual(dummyArticles);
    });

    const req = httpMock.expectOne(`${environment.api}articles/top`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyArticles);  // Simulate returning mock data
  });

  it('should fetch an article by URL', () => {
    const dummyArticle: ArticleType = {
      id: '1',
      title: 'Article 1',
      description: 'Description 1',
      image: 'image1.jpg',
      date: '2023-01-01',
      category: 'Category 1',
      url: 'article-1',
      text: 'Full text of the article',
      comments: [],
      commentsCount: 0
    };

    service.getArticle('article-1').subscribe(article => {
      expect(article).toEqual(dummyArticle);
    });

    const req = httpMock.expectOne(`${environment.api}articles/article-1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyArticle);  // Simulate returning mock data
  });

  it('should fetch articles with parameters', () => {
    const params: ActiveParamsType = { page: 1, categories: ['Category1'] };
    const dummyResponse = {
      count: 10,
      pages: 2,
      items: [
        {
          id: '1',
          title: 'Article 1',
          description: 'Description 1',
          image: 'image1.jpg',
          date: '2023-01-01',
          category: 'Category1',
          url: 'article-1'
        }
      ]
    };

    service.getArticles(params).subscribe(response => {
      expect(response.count).toBe(10);
      expect(response.pages).toBe(2);
      expect(response.items.length).toBe(1);
      expect(response.items[0].title).toBe('Article 1');
    });

    const req = httpMock.expectOne(`${environment.api}articles?page=1&categories=Category1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);  // Simulate returning mock data
  });

  it('should fetch related articles', () => {
    const dummyRelatedArticles: ArticleCardType[] = [
      {
        id: '3',
        title: 'Related Article 1',
        description: 'Description 1',
        image: 'image3.jpg',
        date: '2023-01-03',
        category: 'Category 3',
        url: 'related-article-1'
      },
      {
        id: '4',
        title: 'Related Article 2',
        description: 'Description 2',
        image: 'image4.jpg',
        date: '2023-01-04',
        category: 'Category 4',
        url: 'related-article-2'
      }
    ];

    service.getRelatedArticles('article-1').subscribe(articles => {
      expect(articles.length).toBe(2);
      expect(articles).toEqual(dummyRelatedArticles);
    });

    const req = httpMock.expectOne(`${environment.api}articles/related/article-1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRelatedArticles);  // Simulate returning mock data
  });
});
