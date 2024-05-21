import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutiontreeComponent } from './evolutiontree.component';

describe('EvolutiontreeComponent', () => {
  let component: EvolutiontreeComponent;
  let fixture: ComponentFixture<EvolutiontreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutiontreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvolutiontreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
