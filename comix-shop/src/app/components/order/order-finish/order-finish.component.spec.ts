import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFinishComponent } from './order-finish.component';

describe('OrderFinishComponent', () => {
  let component: OrderFinishComponent;
  let fixture: ComponentFixture<OrderFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
