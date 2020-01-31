import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.page.html',
  styleUrls: ['./company-view.page.scss'],
})
export class CompanyViewPage implements OnInit {
  companyId;
  companyName;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      let data = JSON.parse(params.q.toString());

      this.companyId = data.id;
      this.companyName = data.name;
    })
  }

  ngOnInit() {
  }


}
