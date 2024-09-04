import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentService } from './comment.service';
import { environment } from '../../../environments/environment';
import { DefaultResponseType } from '../../types/default-response.type';
import { CommentType } from '../../types/comment.type';

describe('CommentService', () => {
  let service: CommentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService]
    });
    service = TestBed.inject(CommentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a comment', () => {
    const dummyResponse: DefaultResponseType = { error: false, message: 'Comment added successfully' };
    const commentData = { text: 'This is a test comment', article: 'article-1' };

    service.addComment(commentData).subscribe(response => {
      expect(response.error).toBeFalse();
      expect(response.message).toBe('Comment added successfully');
    });

    const req = httpMock.expectOne(`${environment.api}comments`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(commentData);
    req.flush(dummyResponse);  // Simulate returning mock data
  });

  it('should fetch comments with parameters', () => {
    const params = { offset: 0, article: 'article-1' };
    const dummyResponse = {
      allCount: 2,
      comments: [
        {
          id: '1',
          text: 'Test comment 1',
          date: '2023-01-01',
          likesCount: 10,
          dislikesCount: 1,
          user: { id: 'user1', name: 'User One' },
          userLiked: true
        },
        {
          id: '2',
          text: 'Test comment 2',
          date: '2023-01-02',
          likesCount: 5,
          dislikesCount: 0,
          user: { id: 'user2', name: 'User Two' },
          userLiked: false
        }
      ]
    };

    service.getComments(params).subscribe(response => {
      expect(response.allCount).toBe(2);
      expect(response.comments.length).toBe(2);
      expect(response.comments[0].text).toBe('Test comment 1');
      expect(response.comments[0].likesCount).toBe(10);
      expect(response.comments[0].user.name).toBe('User One');
      expect(response.comments[0].userLiked).toBeTrue();
    });

    const req = httpMock.expectOne(`${environment.api}comments?offset=0&article=article-1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);  // Simulate returning mock data
  });

  it('should apply an action to a comment', () => {
    const dummyResponse: DefaultResponseType = { error: false, message: 'Action applied successfully' };
    const actionData = { action: 'approve' };

    service.applyAction('comment-1', actionData).subscribe(response => {
      expect(response.error).toBeFalse();
      expect(response.message).toBe('Action applied successfully');
    });

    const req = httpMock.expectOne(`${environment.api}comments/comment-1/apply-action`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(actionData);
    req.flush(dummyResponse);  // Simulate returning mock data
  });

  it('should fetch actions for an article', () => {
    const params = { articleId: 'article-1' };
    const dummyResponse = [
      { comment: 'Test comment 1', action: 'approve' },
      { comment: 'Test comment 2', action: 'reject' }
    ];

    service.getActionsForArticle(params).subscribe(response => {
      let responseComments = response as { comment: string, action: string}[];
      if (responseComments) {
        expect(responseComments.length).toBe(2);
        expect(responseComments[0].action).toBe('approve');
      }
    });

    const req = httpMock.expectOne(`${environment.api}comments/article-comment-actions?articleId=article-1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);  // Simulate returning mock data
  });

  it('should fetch actions for a comment', () => {
    const dummyResponse = [
      { comment: 'Test comment 1', action: 'approve' },
      { comment: 'Test comment 2', action: 'reject' }
    ];

    service.getActionsForComment('comment-1').subscribe(response => {
      expect((response as { comment: string, action: string}[]).length).toBe(2);
      expect(response[0].action).toBe('approve');
    });

    const req = httpMock.expectOne(`${environment.api}comments/comment-1/actions`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);  // Simulate returning mock data
  });
});
