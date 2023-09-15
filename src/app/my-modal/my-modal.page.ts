import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.page.html',
  styleUrls: ['./my-modal.page.scss'],
})
export class MyModalPage implements OnInit {
  @Input() onClose!: () => void;
  @Input() isExpanded!: boolean;
  @Input() modalBackgroundColor!: string; 
  isModalOpen = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  closeModal() {
    this.modalCtrl.dismiss().then(() => {
      if (this.onClose) {
        this.onClose();
      }
    });
  }
}
