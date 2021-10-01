import { Component } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    template: `
	<div *ngIf="isShowingRouteLoadIndicator" class="loading">
		<div class="loader"></div>
	</div>
	<router-outlet></router-outlet>
	`
})
export class AppComponent {

	public isShowingRouteLoadIndicator: boolean;
	public isViewInit: boolean;

  	title = 'grafbudowlaniec';

  	constructor( router: Router, translate: TranslateService ) {
		
		translate.setDefaultLang('pl');

  	    this.isShowingRouteLoadIndicator = false;
  	    this.isViewInit = false;

  	    let asyncLoadCount = 0;
 
  	    router.events.subscribe(
  	        ( event: RouterEvent ) : void => {
 
  	            if ( event instanceof RouteConfigLoadStart ) {
 
  	                asyncLoadCount++;
 
  	            } else if ( event instanceof RouteConfigLoadEnd ) {
 
  	                asyncLoadCount--;
 
  	            }
 
  	            this.isShowingRouteLoadIndicator = !! asyncLoadCount;
 
  	        }
  	    );
 
  	}
}
