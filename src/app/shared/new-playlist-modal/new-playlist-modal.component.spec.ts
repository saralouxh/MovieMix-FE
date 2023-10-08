import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlaylistModalComponent } from './new-playlist-modal.component';

describe('NewPlaylistModalComponent', () => {
  let component: NewPlaylistModalComponent;
  let fixture: ComponentFixture<NewPlaylistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPlaylistModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPlaylistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
