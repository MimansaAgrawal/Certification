import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { of } from "rxjs/observable/of";
import { MapAndCatchHandler } from "./mapCatch";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { LoaderService } from "@app/core/services/loader.service";
const uri =
  "https://b13q1g6ff1.execute-api.ap-south-1.amazonaws.com/dev/users/deleteCandidate/";

@Injectable({
  providedIn: "root",
})
export class Main {
  private certificationBaseUri = environment.certificationBaseURI;

  constructor(
    private map: MapAndCatchHandler,
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService,
    private route: ActivatedRoute
  ) {}

  getSampleRequestFromAPI() {
    const apiRequest = this.http.get(`url`);
    return this.map.mapAndCatch(apiRequest);
  }

  authEmail(body) {
    const apiRequest = this.http.post(`users/auth`, body);
    return this.map.mapAndCatch(apiRequest);
  }

  getSampleRequestFromMock() {
    const apiRequest = ["Daily", "Weekly", "Monthly", "Auto"];
    return of(apiRequest);
  }

  getDashboardData() {
    const apiRequest = this.http.get(`users/getAllCandidate`);
    return this.map.mapAndCatch(apiRequest);
  }

  getDashboardDataWithStatus(status) {
    const apiRequest = this.http.get(`users/getAllCandidate?status=${status}`);
    return this.map.mapAndCatch(apiRequest);
  }

  getCount() {
    const apiRequest = this.http.get(`users/getCount`);
    return this.map.mapAndCatch(apiRequest);
  }

  addNewUser() {
    const apiRequest = this.http.get(`users/addnew`);
    return this.map.mapAndCatch(apiRequest);
  }
  getAllSkills() {
    const apiRequest = this.http.get("users/getskills");
    return this.map.mapAndCatch(apiRequest);
  }
  getDesignation(experienceStatus) {
    const apiRequest = this.http.get(
      `users/getDesignation/${experienceStatus}`
    );
    return this.map.mapAndCatch(apiRequest);
  }
  getDocumentsToBeUploadedByStatus(candidateStatus) {
    const apiRequest = this.http.get(
      `users/getdocumentstobeuploaded/${candidateStatus}`
    );
    return this.map.mapAndCatch(apiRequest);
  }
  getCandidateById(id) {
    let headers = new HttpHeaders();
    const apiRequest = this.http.get(`users/getCandidate/${id}`, {
      headers: headers,
    });
    return this.map.mapAndCatch(apiRequest);
  }
  getBuddyDetail() {
    const apiRequest = this.http.get(`users/getBuddyDetail`);
    return this.map.mapAndCatch(apiRequest);
  }
  getRmDetail() {
    const apiRequest = this.http.get(`users/getRmDetail`);
    return this.map.mapAndCatch(apiRequest);
  }
  getItDetail() {
    const apiRequest = this.http.get(`users/getitdetail`);
    return this.map.mapAndCatch(apiRequest);
  }
  getAdminDetail() {
    const apiRequest = this.http.get(`users/getadmindetail`);
    return this.map.mapAndCatch(apiRequest);
  }

  uploadCandidateDocument(body) {
    const apiRequest = this.http.post(`users/uploaddocument`, body);
    return this.map.mapAndCatch(apiRequest);
  }

  putData(url, body) {
    const apiRequest = this.http.put(url, body);
    return this.map.mapAndCatch(apiRequest);
  }

  postToDownloadData(body) {
    const apiRequest = this.http.post(`users/downloaddocument`, body);
    return this.map.mapAndCatch(apiRequest);
  }

  postToSaveData(body) {
    const apiRequest = this.http.post(`users/save`, body);
    return this.map.mapAndCatch(apiRequest);
  }

  postToUpdateCandidateData(body) {
    const apiRequest = this.http.post(`users/update`, body);
    return this.map.mapAndCatch(apiRequest);
  }

  postToUpdateData(body) {
    const apiRequest = this.http.post(`users/save`, body);
    return this.map.mapAndCatch(apiRequest);
  }

  DeleteRow(id: any) {
    const apiRequest = this.http.get("users/deleteCandidate/" + id);
    return this.map.mapAndCatch(apiRequest);
  }

  save(data) {
    console.log("data sent ", data);
    return this.http.post("users/save", data).subscribe((info) => {
      console.log(info);
      setTimeout(() => {
        this.loaderService.setLoader(false);
      });
      if (info["statusCode"] == "[200]") {
        this.router.navigateByUrl("dashboard/grid");
      } else {
        console.log(info["message"]);
      }
    });
  }

  saveFeedbackData(data) {
    const apiRequest = this.http.post("users/save", data);
    return this.map.mapAndCatch(apiRequest);
    console.log("data sent ", data);
  }

  getAllFeedbackData(status) {
    const apiRequest = this.http.get(
      `users/getAllTrainingProbationCandidate?status=${status}`
    );
    return this.map.mapAndCatch(apiRequest);
  }

  update(data) {
    console.log("data sent ", data);
    return this.http.post("users/update", data).subscribe((info) => {
      console.log(info);
      setTimeout(() => {
        this.loaderService.setLoader(false);
      });
      if (info["statusCode"] == "[200]") {
        this.router.navigateByUrl("dashboard/grid");
      } else {
        console.log(info["message"]);
      }
    });
  }

  saveBankDetails(data) {
    console.log("data sent ", data);
    return this.http.post("users/save", data).subscribe((info) => {
      console.log(info);
      setTimeout(() => {
        this.loaderService.setLoader(false);
      });
      if (info["statusCode"] == "[200]") {
        const isExternalUser = this.route.snapshot.queryParamMap.get("token")
          ? true
          : false;
        const message = "Data saved successfully";
        if (isExternalUser) {
          this.loaderService.setNotificationObject("success", message);
        } else {
          this.router.navigateByUrl("dashboard/grid");
        }
      } else {
        console.log(info["message"]);
      }
    });
  }

  externalTokenVerify(token) {
    const apiRequest = this.http.get(`users/validatetoken?token=${token}`);
    return this.map.mapAndCatch(apiRequest);
    // const sampleResponse = {
    //   data: { userId: '123', sessionToken: '456', screenId: '5f3a33a7e454f016c0f1ff13' },
    //   message: "Success",
    //   statusCode: "[200]"
    // }
    // return of(sampleResponse);
  }

  postToSendMail(body) {
    const apiRequest = this.http.post(`users/addSkillsMail`, body);
    return this.map.mapAndCatch(apiRequest);
  }

  postToTriggerMailManually(body) {
    const apiRequest = this.http.post(`users/triggermail`, body);
    return this.map.mapAndCatch(apiRequest);
  }

  getFeedbackData() {
    const apiRequest = this.http.get(`users/getFeedbackData`);
    return this.map.mapAndCatch(apiRequest);
  }

  
}
