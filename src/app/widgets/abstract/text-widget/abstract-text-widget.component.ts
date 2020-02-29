import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-abstract-text-widget',
  templateUrl: './abstract-text-widget.component.html',
  styleUrls: ['./abstract-text-widget.component.styl']
})
export class AbstractTextWidgetComponent {
  @Input() title: string;
  @Input() value: string;
}
