import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPlaylistComponent } from './import-playlist.component';

describe('ImportPlaylistComponent', () => {
  let component: ImportPlaylistComponent;
  let fixture: ComponentFixture<ImportPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
