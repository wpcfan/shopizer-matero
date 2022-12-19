import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsUpdateComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
