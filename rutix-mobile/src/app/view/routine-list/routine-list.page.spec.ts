import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutineListComponent } from './routine-list.component';

describe('RoutineListPage', () => {
  let component: RoutineListComponent;
  let fixture: ComponentFixture<RoutineListComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
