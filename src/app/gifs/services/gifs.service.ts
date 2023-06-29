import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearcResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'apbgYC1hByQF5hQEglstXhruoOt1Fp8D';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {}

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizedHistory(tag: string) {
    tag = tag.toLocaleLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizedHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', 10)
    .set('q', tag)

    this.http
      .get<SearcResponse>(
        `${this.serviceUrl}/search`, {params}
      )
      .subscribe(res => {
        this.gifsList = res.data;
        console.log(this.gifsList);
      });

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=apbgYC1hByQF5hQEglstXhruoOt1Fp8D&q=valorant&limit=10')
    // .then(res => res.json())
    // .then(data => console.log(data));
  }
}
