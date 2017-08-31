import { Component, OnInit } from '@angular/core';

import { VersionService } from '../version/version.service';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit {
  private eaddrPropURL: string = "./assets/buildEaddr.json"; 
  private ratesmainPropURL: string = "./assets/buildRates.json"; 
  private eaddrBuildInfo;
  private ratesmainBuildInfo;
  constructor(private _version: VersionService ) { }

  ngOnInit() {
    this._version.getVersionDetails(this.eaddrPropURL).subscribe( buildInfo => {
      this.eaddrBuildInfo = buildInfo;
      console.log(buildInfo);
    });
    this._version.getVersionDetails(this.ratesmainPropURL).subscribe( buildInfo => {
      this.ratesmainBuildInfo = buildInfo;
      console.log(buildInfo);
    });
  }

}
