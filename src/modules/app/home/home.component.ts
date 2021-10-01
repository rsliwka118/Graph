import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    constructor( private router: Router, public translate: TranslateService) {}

    loadEditor(): void {
        this.router.navigateByUrl('/editor');
    }
}
