import { Injectable } from '@angular/core';
import {Headers, Http, Request, RequestMethod, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

declare var Wsse: any
@Injectable()
export class ReportService {
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
    // report data service
    reportService(payload: any, method: string): Observable<any> {
        this.payload = payload;
        this.currentMethod = method;
        this.theReportCommonBits();
        // fetch data 
        return this._http.request(new Request(this.requestoptions))
            //.delay(10000)
            .map(this.extractData)
            //.catch(this.handleError);
            .catch(
            function unwrapError(error: any) {
                try {
                    return (Observable.throw(error.json()));
                }
                catch (jsonError) {
                    // If the error couldn't be parsed as JSON data
                    // then it's possible the API is down or something
                    // went wrong with the parsing of the successful
                    // response. In any case, to keep things simple,
                    // we'll just create a minimum representation of
                    // a parsed error.
                    var minimumViableError = {
                        success: false
                    };
                    return (Observable.throw(minimumViableError));
                }
            }
            );
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.error) ? error.error :
            error.error_uri ? `${error.error_uri} - ${error.error_description}` : 'Server error';
        console.error('errorMessage', errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    initiatePolling(url, interval) {

        return Observable.create(function (observer) {

            // initial request (no delay)
            requestData();
            var timerId = setInterval(requestData, interval);

            function requestData() {
                var subscription = this._http.get(url).timeout(20000)
                    .subscribe(
                    result => {
                        observer.next(result);
                        subscription.unsubscribe();
                    },
                    err => {
                        observer.next(err);
                        subscription.unsubscribe();
                    },
                    () => {
                        subscription.unsubscribe();
                    });
            }

            return function () {
                observer.complete();
                window.clearInterval(timerId);
            }
        });
    }

}
