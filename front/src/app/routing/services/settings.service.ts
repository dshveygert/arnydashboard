import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  contentPath = '/assets/content';

  public scrollTo(id: string, offset = 56): void {
    const item = document.getElementById(id);
    if (!!item) {
      const y = item.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }

  public scrollTop(offset = 56): void {
    window.scrollTo({top: offset, behavior: 'smooth'});
  }

  constructor() { }
}
