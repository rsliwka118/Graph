import { Compiler, ComponentFactory, Injectable, Type, ViewContainerRef } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LazyLoadingService {

    constructor( private compiler: Compiler ) { }

	componentFactories: ComponentFactory<any>[];

	loadModule(el: ViewContainerRef, moduleType: Type<any>) {
		el.clear();
		const moduleFactories = this.compiler.compileModuleAndAllComponentsSync(moduleType);
		this.componentFactories = moduleFactories.componentFactories;
	}

	createComponent(el: ViewContainerRef, componentName: string) {
		const component = this.componentFactories.find(e => e.selector === componentName);
		el.createComponent(component);
	}
}
