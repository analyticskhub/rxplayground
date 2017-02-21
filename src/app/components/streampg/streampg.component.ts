import { Component, OnInit } from '@angular/core';
import {StreamsService} from './streams.service'
import {ReportService} from './report.service'
import {eVars} from './streams.interface';
import {Props} from './streams.interface';
import {Events} from './streams.interface';

import {Observable} from 'rxjs/Rx'

export interface todos {
  name: string;
  status: boolean;
}

export interface dLayer {
  version?: string;
  pageName?: string;
  pageType?: string;
  pageStep?: string;
  experience?: string;
  formName?: string;
}

export interface Names {
  id: number;
  name: string;
}
@Component({
  selector: 'app-streampg',
  templateUrl: './streampg.component.html',
  styleUrls: ['./streampg.component.css']
})



export class StreampgComponent implements OnInit {
  private eVars: any = [];
  errorMessage: any;
  constructor(private _streamService: StreamsService, private _reportService: ReportService) { }

  numArray = ['john', 'junnu', 'jenny', 'jin', 'james'];
  enabledEvars: eVars;

  objArray: todos[] = [
    {
      name: 'shop for phone',
      status: true
    },
    {
      name: 'shop for shoes',
      status: false
    },
    {
      name: 'shop for doll',
      status: true
    }
  ];

  obsFromArray() {
    Observable.from(this.numArray)
      .filter(name => name === 'junnu')
      .subscribe(
      function (name) {
        console.info('Next', name)
      },
      function (err) {
        console.info('Next', err)
      },
      function () {
        console.info('done!')
      }
      )

  }

  obArrayFrom() {
    Observable.from(this.objArray)
      .filter((todo: todos) => todo.status === true)
      .subscribe(
      function (todos) {
        console.info('Next', todos)
      },
      function (err) {
        console.info('Next', err)
      },
      function () {
        console.info('done!')
      }
      )

  }



  //isEnabled = (function (val) { return val.enabled === true; });

  fetchEvars() {
    this._streamService.getEvars()
      /* .filter(data => data.enabled)
      .flatMap(data => {
        return Observable.from(data)
      }) 
      */
      //.filter((evars:eVars) => evars.expiration_type === 'day')
      /*.flatMap((data: eVars) => {
        data = data.enabled;
        this.enabledEvars =  data;
      })
      */
      //.filter(this.isEnabled)
      .subscribe(
      data => this.eVars.push(data),
      error => this.errorMessage = <any>error,
      () => console.info('eVar Count', this.eVars.length)

      )

  }
  private doctors = [];
  getDoctors() {
    this._streamService.getUsers()
      .subscribe((data) => {
        this.doctors.push(data)
      },
      error => this.errorMessage = <any>error,
      () => console.info('eVar Count', this.doctors)
      );
  }
  dataLayer$: Observable<dLayer>;
  digitalData: dLayer = {
    version: '1.0'
  };

  createDatalayer(details) {
    let dLayer = details;
    this.digitalData = (<any>Object).assign(this.digitalData, dLayer)
    let stringifyDataLayer = JSON.stringify(this.digitalData, null, 4);
    this.dataLayer$ = Observable.of(stringifyDataLayer);
    return this.digitalData;
  }

  addToDataLayer() {
    let dlprop = [
      {
        pageType: 'product'
      },
      {
        pageStep: 'start'
      },
      {
        pageName: 'welcome'
      },
      {
        experience: 'mobile'
      },
      {
        formName: 'savings and transaction'
      }
    ]
    let randomProp = dlprop[Math.floor(Math.random() * dlprop.length)];
    this.createDatalayer(randomProp);
  }

  // function to add random value to doctors array 
  nameLog$: Observable<any>;

  names: Names[] = [
    {
      name: 'June',
      id: 11
    },
    {
      name: 'jamie',
      id: 12
    },
    {
      name: 'jenny',
      id: 13
    }
  ];

  addToNames() {
    let users = [
      {
        id: 21,
        name: 'junnu'
      },
      {
        id: 23,
        name: 'jumbo'
      },
      {
        id: 22,
        name: 'jasmine'
      },
      {
        id: 24,
        name: 'john'
      }]
    let randomDoc = users[Math.floor(Math.random() * users.length)];
    this.names.push(randomDoc);
    this.nameLog$ = Observable.of(this.names);
    return console.info(JSON.stringify(this.names, null, 4));

  }
  reportData: any;
  reportID: number;
  queLog: any;
  getReport(payload: any, method: string) {

    this._reportService.reportService(payload, method)
      //.delay(10000)
      .do(x => console.info('first stream', x))
      .flatMap(reportId => {
        this.reportID = reportId
        return this._reportService.reportService(reportId, this.get_Report)
      })
      /*
     .flatMap(reportid => {
       return this._reportService.reportService(this.reportID, this.get_Report)
     })
    
     .do(y => console.info('second stream', y))
     .flatMap(quelog => {
       this.queLog = quelog
       if (this.queLog[0].status === 'runnig') {
         return this._reportService.reportService(this.queLog[0].reportID, this.get_Report)
       } else {
         if (this.queLog[0].status === 'complete') {
           return this._reportService.reportService(this.queLog[0].reportID, this.get_Report)
         }
       }
     })
     .do(z => console.info('third stream', z))
     */
      .subscribe(
      data => this.reportData = data,
      err => err = this.errorMessage,
      () => this.formatReportData()
      // () => console.info('finalData ', JSON.stringify(this.reportData, null, 4))
      );
  }

  pollForStatus() {
    // this._reportService.initiatePolling()
  }
  tableHeader: any;
  reportMetrics: any;
  formatReportData() {
    let reportDimensions = this.reportData.report.elements;
    this.reportMetrics = this.reportData.report.metrics;
    return this.reportMetrics;
  }

  payload = {
    "reportDescription": {
      "reportSuiteID": "westpac-prd",
      "dateFrom": "2015-12-10",
      "dateTo": "2015-12-20",
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
  queue_Report: string = 'Report.Queue';
  check_Report: string = 'Report.GetQueue';
  get_Report: string = 'Report.Get';

  ngOnInit() {
    this.fetchEvars()
    this.obsFromArray()
    this.obArrayFrom()
    this.getDoctors()

    this.getReport(this.payload, this.queue_Report);
    ///
  }

}
