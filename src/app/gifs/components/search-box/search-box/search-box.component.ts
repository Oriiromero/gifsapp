import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h3>Buscar:</h3>
    <input type="text" class="form-control" placeholder="Buscar gifs..."  (keyup.enter)="searchTag()" #txtTagInput/>
  `,
})
export class SearchBoxComponent {
  constructor( private gifsService: GifsService) {}

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    
    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }
}
