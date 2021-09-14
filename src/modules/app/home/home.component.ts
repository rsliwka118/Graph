import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    breakpoint: number;

    constructor( private router: Router) { }

    ngOnInit() {
        this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    }
      
    onResize(event) {
        this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
    }

    loadEditor(): void {
        this.router.navigateByUrl('/editor');
    }
}
