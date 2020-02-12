import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SliderService } from 'src/app/services/slider.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})

export class SliderComponent implements OnInit {
  @Input() options;
  items = [];

  constructor(private router: Router, private sliderService: SliderService) { }

  ngOnInit() {
    this.sliderService.getData(this.options.requestUrl)
      .subscribe(data => {

        for (let d of Object.keys(data)) {
          this.items.push(data[d]);
        }
      });
  }

  openDetails(item) {
    let data = {
      id: item[this.options.dataObject.id],
      name: item[this.options.dataObject.name]
    }

    let params = {
      queryParams: {
        q: JSON.stringify(data)
      }
    }

    this.router.navigate([this.options.slideRedirect], params);
  }

  openAll() {
    this.router.navigate(['/browse-by-all'])
  }
}
