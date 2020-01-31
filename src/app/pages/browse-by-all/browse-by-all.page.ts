import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-browse-by-all',
  templateUrl: './browse-by-all.page.html',
  styleUrls: ['./browse-by-all.page.scss'],
})
export class BrowseByAllPage implements OnInit {

  itemId;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.itemId = params.browseId;
    })
  }

  ngOnInit() {
  }


}
