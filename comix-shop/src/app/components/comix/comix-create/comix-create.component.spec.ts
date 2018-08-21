import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComixCreateComponent } from './comix-create.component';

describe('ComixCreateComponent', () => {
  let component: ComixCreateComponent;
  let fixture: ComponentFixture<ComixCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComixCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComixCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
