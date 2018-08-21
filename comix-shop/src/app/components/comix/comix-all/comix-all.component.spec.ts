import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComixAllComponent } from './comix-all.component';

describe('ComixAllComponent', () => {
  let component: ComixAllComponent;
  let fixture: ComponentFixture<ComixAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComixAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComixAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
