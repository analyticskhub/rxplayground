import { Injectable } from '@angular/core';
import {Headers, Http, Request, RequestMethod, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

declare var Wsse: any

export interface Error {
  error: string;
  error_description: string;
  error_uri: any;
}

@Injectable()
export class AnalyticsService {
  pollingAttempt = 0;

  constructor(private _http: Http) { }

  private endPointBaseUrl = 'https://api4.omniture.com/admin/1.4/rest/?method=';  // URL to web API
  private apiUserName: string = 'aumachigi:Westpac';
  private apiSecret: string = 'b67438ac16f7367dfddc69d0f1771af9';
  headers: Headers;
  requestoptions: RequestOptions;
  payload: any;
  currentMethod: string;


  theReportCommonBits() {
    this.headers = new Headers();
    this.headers.append("Content-Type", 'application/json');
    let wsse = new Wsse();
    let newheaders = wsse.generateAuth(this.apiUserName, this.apiSecret);
    let url = this.endPointBaseUrl + this.currentMethod;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    //create the post request options 
    this.requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: url,
      headers: newheaders,
      body: JSON.stringify(this.payload)
    })
    return this.requestoptions;
  }

  pollForReportStatus(payload: any, method: string): Observable<any> {
    this.payload = payload;
    this.currentMethod = method;
    this.theReportCommonBits();

    return this._http.request(new Request(this.requestoptions))
      .map((res: Response) => {
        let queStatus = res.json();
        return queStatus;
      })
      .catch(res => {
        // The error callback (second parameter) is called
        let error = res.json();
        console.info('err');
        console.info(JSON.stringify(error, null, 4));
        return Observable.of(error);
        // The success callback (first parameter) is called
        // return Observable.of(res.json());
      })
  }

  makeRequest(payload: any, method: string): Observable<any> {
    // pass payload and method into common bits.. reduce the noise here
    // make it more expressive! 
    /// easy to read
    this.payload = payload;
    this.currentMethod = method;
    this.theReportCommonBits();
    // fetch data 
    return this._http.request(new Request(this.requestoptions))
      .map((res: Response) => {
        let rID = res.json();
        this.payload = rID
        return this.payload;
      })
      .do(x => console.info('initial-stream', x))
      .flatMap(reportid => 
        Observable.interval(4000)
          .flatMap(reportid => this.pollForReportStatus(this.payload, 'Report.Get'))
          .do(p => console.info('pollingAttempt', this.pollingAttempt++))
          .do(y => console.info('poll-stream', JSON.stringify(y, null, 4)))
          // better to change the filter to positive use case, that is filter observable only if it has report.type = 'ranked|sdfdf'
          // use takeWhile instead of filter? http://www.learnrxjs.io/operators/filtering/takewhile.html
         // http://www.learnrxjs.io/operators/filtering/filter.html
          .filter((error:Error) => error.error !== 'report_not_ready')
          //.do(z => console.info('filter-stream', z))
          // remove take??
          // add loading status and link to loading gif
          // how to handle error if api fails after timeout?
          .take(1)
          .map(this.extractData)
          .do(p => console.info('pollingAttempt', this.pollingAttempt = 0))
          .timeout(24000)
      )
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    //console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
