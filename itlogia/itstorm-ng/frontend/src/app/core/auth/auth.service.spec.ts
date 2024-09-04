import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { DefaultResponseType } from '../../types/default-response.type';
import { LoginResponseType } from '../../types/login-response.type';
import { SignupResponseType } from '../../types/signup-response.type';
import { UserResponseType } from '../../types/user-response.type';
import { throwError } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding
    localStorage.clear(); // Clear localStorage after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store tokens', () => {
    const loginResponse: LoginResponseType = {
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
      userId: 'mockUserId'
    };

    service.login('test@example.com', 'password123', true).subscribe(response => {
      expect(response).toEqual(loginResponse);
      service.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
      expect(localStorage.getItem(service.accessTokenKey)).toBe(loginResponse.accessToken);
      expect(localStorage.getItem(service.refreshTokenKey)).toBe(loginResponse.refreshToken);
    });

    const req = httpMock.expectOne(`${environment.api}login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: 'test@example.com',
      password: 'password123',
      rememberMe: true
    });
    req.flush(loginResponse); // Simulate returning mock data
  });

  it('should logout and remove tokens', () => {
    const logoutResponse: DefaultResponseType = { error: false, message: 'Logged out successfully' };

    service.setTokens('mockAccessToken', 'mockRefreshToken');
    service.logout().subscribe(response => {
      expect(response).toEqual(logoutResponse);
      service.removeTokens();
      expect(localStorage.getItem(service.accessTokenKey)).toBeNull();
      expect(localStorage.getItem(service.refreshTokenKey)).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.api}logout`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      refreshToken: 'mockRefreshToken'
    });
    req.flush(logoutResponse); // Simulate returning mock data
  });

  it('should get user info when logged in', () => {
    const userInfoResponse: UserResponseType = {
      id: 'mockUserId',
      name: 'John Doe',
      email: 'john.doe@example.com'
    };

    service.setTokens('mockAccessToken', 'mockRefreshToken');
    service.getUserInfo().subscribe(response => {
      expect(response).toEqual(userInfoResponse);
    });

    const req = httpMock.expectOne(`${environment.api}users`);
    expect(req.request.method).toBe('GET');
    req.flush(userInfoResponse); // Simulate returning mock data
  });

  it('should throw error when getting user info without tokens', () => {
    service.removeTokens();

    service.getUserInfo().subscribe({
      next: () => fail('Expected an error, but got a success response'),
      error: (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Can not find tokens');
      }
    });
  });

  it('should signup a new user', () => {
    const signupResponse: SignupResponseType = {
      userId: 'mockUserId',
      accessToken: 'newAccessToken',
      refreshToken: 'newRefreshToken'
    };

    service.signup('John Doe', 'john.doe@example.com', 'password123').subscribe(response => {
      expect(response).toEqual(signupResponse);
    });

    const req = httpMock.expectOne(`${environment.api}signup`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    });
    req.flush(signupResponse); // Simulate returning mock data
  });

  it('should refresh tokens', () => {
    const refreshResponse: LoginResponseType = {
      accessToken: 'newAccessToken',
      refreshToken: 'newRefreshToken',
      userId: 'mockUserId'
    };

    service.setTokens('oldAccessToken', 'oldRefreshToken');
    service.refresh().subscribe(response => {
      expect(response).toEqual(refreshResponse);
      service.setTokens(refreshResponse.accessToken, refreshResponse.refreshToken);
      expect(localStorage.getItem(service.accessTokenKey)).toBe(refreshResponse.accessToken);
      expect(localStorage.getItem(service.refreshTokenKey)).toBe(refreshResponse.refreshToken);
    });

    const req = httpMock.expectOne(`${environment.api}refresh`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      refreshToken: 'oldRefreshToken'
    });
    req.flush(refreshResponse); // Simulate returning mock data
  });

  it('should throw error when refreshing tokens without tokens', () => {
    service.removeTokens();
    service.refresh().subscribe({
      next: () => fail('Expected an error, but got a success response'),
      error: (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Can not find tokens');
      }
    });
  });
});
