import { Injectable } from '@angular/core';

@Injectable({
  	providedIn: 'root'
})
export class InputService {

    private _isTyping = false;

    set isTyping(value: boolean){
        this._isTyping = value;
    }

    get isTyping(): boolean {
        return this._isTyping;
    }

}