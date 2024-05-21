import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionitemComponent } from './evolutionitem.component';

describe('EvolutionitemComponent', () => {
  let component: EvolutionitemComponent;
  let fixture: ComponentFixture<EvolutionitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvolutionitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
