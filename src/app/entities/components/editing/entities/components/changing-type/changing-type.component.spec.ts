import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangingTypeComponent } from './changing-type.component';

describe('ChangingTypeComponent', () => {
  let component: ChangingTypeComponent;
  let fixture: ComponentFixture<ChangingTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangingTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
