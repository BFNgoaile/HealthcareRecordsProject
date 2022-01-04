import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-record',
  templateUrl: './single-record.component.html',
  styleUrls: ['./single-record.component.scss'],
})
export class SingleRecordComponent implements OnInit {
  @Input() data;

  constructor(private modalController: ModalController) { }


  ngOnInit() {
    console.log(this.data);
  }

  closeModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
