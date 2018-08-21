import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAllComponent } from './order-all.component';

describe('OrderAllComponent', () => {
  let component: OrderAllComponent;
  let fixture: ComponentFixture<OrderAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
