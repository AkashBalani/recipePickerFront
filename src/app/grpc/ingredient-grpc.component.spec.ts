import { ComponentFixture, TestBed } from '@angular/core/testing';

import { grpc } from '@improbable-eng/grpc-web';
import { IngredientServiceClient } from './proto/IngredientServiceClientPb';
import { AddIngredientRequest } from './proto/ingredient_pb';
// import { Injectable } from '@angular/core';


describe('IngredientFormComponent', () => {
  let component: IngredientFormComponent;
  let fixture: ComponentFixture<IngredientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
