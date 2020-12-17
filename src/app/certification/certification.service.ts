import { Main } from "./../core/_api/main.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "@env/environment";
import {
  Credentials,
  CredentialsService,
} from "./../core/authentication/credentials.service";
import { LoaderService } from "./../core/services/loader.service";
import { MapAndCatchHandler } from "./../core/_api/mapCatch";
import { CERTIFICATION_ROLE } from "./certification.constants";
import { shareReplay, map } from "rxjs/operators";

@Injectable()
export class CertificationService {
  private misDeptTeamCache$: Observable<any>;
  private reminderEmployeeListCache$: Observable<any>;
  private certManagmentCache$: Observable<any>;

  private certificationBaseUri = environment.certificationBaseURI;
  public role: CERTIFICATION_ROLE;
  updatedValue: any;
  updateFlag = false;
  idToUpdate: any;
  private credentials: Credentials;

  constructor(
    private map: MapAndCatchHandler,
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private mainService: Main,
    private credentialsService: CredentialsService
  ) {
    this.setCertificationRole();
    
    this.credentials = this.credentialsService.credentials;
  }

  sendReminder(employees) {
    const apiRequest = this.http.post(
      `${this.certificationBaseUri}certifications/reminder`,
      employees
    );
    return this.map.mapAndCatch(apiRequest);
    // const apiRequest = this.http.post(`users/triggermail`, body);
    // return this.map.mapAndCatch(apiRequest);
  }

  getCertificationData() {
    switch (this.role) {
      case CERTIFICATION_ROLE.ADMIN:
      case CERTIFICATION_ROLE.MANAGER:
        return this.map.mapAndCatch(
          this.http.get(`${this.certificationBaseUri}certifications`)
        );

      case CERTIFICATION_ROLE.USER:
        return this.map.mapAndCatch(
          this.http.get(
            `${this.certificationBaseUri}certifications/${this.credentials.user.Email}`
          )
        );
    }
  }

  getReminderEmployeeList() {
    if (!this.reminderEmployeeListCache$) {
      this.reminderEmployeeListCache$ = this.misDeptTeamCache$.pipe(
        shareReplay(1)
      );
    }

    return this.reminderEmployeeListCache$;
  }

  getMisDetails() {
    if (!this.misDeptTeamCache$) {
      const apiRequest = this.http.get(
        `${this.certificationBaseUri}certifications/misdetails`
      );
      this.misDeptTeamCache$ = this.map
        .mapAndCatch(apiRequest)
        .pipe(shareReplay(1));
    }

    return this.misDeptTeamCache$;
  }
  getCertificationDataByTime(month, year) {
    const apiRequest = this.http.get(
      `${this.certificationBaseUri}certifications/export?month=${month}&year=${year}`
    );
    return this.map.mapAndCatch(apiRequest);
  }

  setCertificationRole() {
    switch (this.credentialsService.credentials.role) {
      case CERTIFICATION_ROLE.ADMIN.toString():
        this.role = CERTIFICATION_ROLE.ADMIN;
        break;

      case CERTIFICATION_ROLE.MANAGER.toString():
        this.role = CERTIFICATION_ROLE.MANAGER;
        break;

      case CERTIFICATION_ROLE.USER.toString():
        this.role = CERTIFICATION_ROLE.USER;
        break;

      default:
        this.role = CERTIFICATION_ROLE.USER;
    }
  }
  setCertificationData(body) {
    const apiRequest = this.http.post(
      `${this.certificationBaseUri}certifications`,
      body
    );
    return this.map.mapAndCatch(apiRequest);
  }
  updateCertificationData(body) {
    const apiRequest = this.http.put(
      `${this.certificationBaseUri}certifications`,
      body
    );
    return this.map.mapAndCatch(apiRequest);
  }
  deleteCertificationData(id) {
    const apiRequest = this.http.delete(
      `${this.certificationBaseUri}certifications/delete/${id}`
    );
    return this.map.mapAndCatch(apiRequest);
  }

  get teamDetails() {
    return {
      team: this.credentials.user.Team,
      department: this.credentials.user.DepartmentName,
      name: this.credentials.user.EmployeeName,
      email: this.credentials.user.Email,
    };
  }

  getCertificationManagmentDetails() {
    if (!this.certManagmentCache$) {
      const apiRequest = this.http.get(
        `${this.certificationBaseUri}certifications/management/${this.credentials.user.Email}`
      );
      this.certManagmentCache$ = this.map
        .mapAndCatch(apiRequest)
        .pipe(shareReplay(1));
    }

    return this.certManagmentCache$;
  }

  isAdmin() {
    return this.role === CERTIFICATION_ROLE.ADMIN;
  }
}
