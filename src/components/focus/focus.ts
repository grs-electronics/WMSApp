import { Directive, Input, EventEmitter, ElementRef, Renderer, Inject } from '@angular/core';
import {Keyboard} from '@ionic-native/keyboard';
/**
 * Generated class for the Focus directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[focuse]', // Attribute selector
  providers: [Keyboard]
})
export class FocusDirective {
  @Input('input') focusEvent: EventEmitter<boolean>;
  constructor(@Inject(ElementRef) private element: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    this.focusEvent.subscribe(event => {
      this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
    });
  }
}
