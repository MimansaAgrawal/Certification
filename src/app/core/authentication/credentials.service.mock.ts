import { CERTIFICATION_ROLE } from './../../certification/certification.constants';
import { Credentials } from './credentials.service';

export class MockCredentialsService {
  credentials: Credentials | null = {
    username: 'test',
    oAuthToken: '123',
    serverToken: '123',
    user: {
      DepartmentName: 'test',
      Designation: 'test',
      Email: 'test',
      EmployeeName: 'test',
      ExtNo: 'test',
      ImagePath: 'test',
      Location: 'test',
      MobileNumber: 'test',
      ReportingManager: 'test',
      Team: 'test',
      WsNo: 'test'
    },
    role : CERTIFICATION_ROLE.USER
  };

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  setCredentials(credentials?: Credentials, _remember?: boolean) {
    this.credentials = credentials || null;
  }
}
