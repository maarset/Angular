import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountyPdComponent } from './county-pd.component';

describe('CountyPdComponent', () => {
  let component: CountyPdComponent;
  let fixture: ComponentFixture<CountyPdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountyPdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountyPdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
