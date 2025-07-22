import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutineService } from 'src/backend/routine/routine.service';
import { of } from 'rxjs';
import {RoutineListComponent} from "./routine-list.component";

describe('RoutineListComponent', () => {
  let component: RoutineListComponent;
  let fixture: ComponentFixture<RoutineListComponent>;

  const mockRoutines = [
    { id: 1, name: 'Routine Matin', days: [1, 3, 5] },
    { id: 2, name: 'Routine Soir', days: [2, 4, 6] }
  ];

  const mockRoutineService = {
    listRoutinesByUser: jasmine.createSpy().and.returnValue(of(mockRoutines))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoutineListComponent],
      providers: [
        { provide: RoutineService, useValue: mockRoutineService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Appelle ngOnInit
  });

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it('devrait charger les routines à l\'initialisation', () => {
    expect(mockRoutineService.listRoutinesByUser).toHaveBeenCalled();
    expect(component.routines.length).toBe(2);
    expect(component.routines[0].name).toBe('Routine Matin');
  });

  it('devrait retourner les noms des jours correctement', () => {
    const result = component.getDayNames([1, 3, 5]);
    expect(result).toBe('Lundi, Mercredi, Vendredi');
  });

  it('devrait retourner une chaîne vide si le tableau est vide', () => {
    const result = component.getDayNames([]);
    expect(result).toBe('');
  });
});
