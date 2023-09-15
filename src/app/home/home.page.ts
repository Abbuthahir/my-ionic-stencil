import { Component } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { MyModalPage } from '../my-modal/my-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isContracting: boolean = false;

  isModalOpen = false;
  isExpanded: boolean = false;
  constructor(private modalCtrl: ModalController, private animationCtrl: AnimationController) { }


  async openModal() {
    this.isExpanded = !this.isExpanded;
    this.isModalOpen = true;

    const enterAnimation = (baseEl: any) => {
      const root = baseEl.shadowRoot;

      const backdropAnimation = this.animationCtrl.create()
        .addElement(root.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl.create()
        .addElement(root.querySelector('.modal-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(1)' },
          { offset: 1, opacity: '1', transform: 'scale(1)' }
        ]);

      return this.animationCtrl.create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(1000)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    }

    const leaveAnimation = (baseEl: any) => {
      return enterAnimation(baseEl).direction('reverse');
    }

    const modal = await this.modalCtrl.create({
      backdropDismiss: false,
      component: MyModalPage,
      cssClass: 'transparent-modal',
      enterAnimation,
      leaveAnimation,
      componentProps: {
        isExpanded: this.isExpanded,
        modalBackgroundColor: 'var(--ion-color-danger)',
        onClose: () => {
          this.isContracting = true;
          this.isExpanded = false;
          this.closeModal();
        },
      },
    });

    setTimeout(async () => {
      await modal.present();
    }, 300);

  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async closeModal() {
    if (this.isContracting) {
      setTimeout(async () => {
        const modal = await this.modalCtrl.getTop();
        if (modal) {
          await modal.dismiss();
        }
        this.isContracting = true; 
      }, 300); 
    }
  }
}
