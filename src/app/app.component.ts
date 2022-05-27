import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('en');
    if (navigator.language.startsWith('es')) {
      this.translate.use('es');
    }
    else {
      this.translate.use('en');
    }
  }
}
