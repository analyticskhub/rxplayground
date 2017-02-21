import { Component, OnInit } from '@angular/core';
import {AnalyticsService} from './analytics.service';
import {Observable} from 'rxjs/Rx'
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private _analyticsService: AnalyticsService) { }

  rawData: any;
  finalData: any;
  payload: any = {
    "reportDescription": {
      "reportSuiteID": "westpac-prd",
      "dateFrom": "2015-12-10",
      "dateTo": "2016-09-10",
      "metrics": [{
        "id": "event21",
      }, {
          "id": "event22",
        }
      ],
      "elements": [{
        "id": "evar23",
        "top": "10"
      }
      ]
    }
  }
  queueMethod: string = 'Report.Queue';
  getMethod: string = 'Report.Get';

  payloadTwo: number;
  ngOnInit() {
    this.getData()
  }

  getData() {
    this._analyticsService.makeRequest(this.payload, this.queueMethod)
      .subscribe(
      data => {
        this.rawData = data;
        console.info('observable', JSON.stringify(this.rawData, null, 4))
      },
      error => {
        //console.error("Error fetting data!");
        return Observable.throw(error);
      }
      );
  }

}
