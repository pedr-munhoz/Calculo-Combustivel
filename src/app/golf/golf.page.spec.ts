import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GolfPage } from './golf.page';

describe('GolfPage', () => {
  let component: GolfPage;
  let fixture: ComponentFixture<GolfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GolfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
