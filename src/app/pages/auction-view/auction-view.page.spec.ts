import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuctionViewPage } from './auction-view.page';

describe('AuctionViewPage', () => {
  let component: AuctionViewPage;
  let fixture: ComponentFixture<AuctionViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
