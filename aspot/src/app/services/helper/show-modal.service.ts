import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ShowModalService {

  constructor(
    private modalService: BsModalService
  ) { }

  openConfirmationModal(secenek:boolean,baslik:string,mesajlar: string[]): Promise<boolean> {
    const modalRef: BsModalRef = this.modalService.show(ModalComponent);
    if (modalRef.content) {
      modalRef.content.formErrorList = mesajlar;

      return modalRef.content.openModal(secenek,baslik).then((result: boolean) => {
        if (result) {
          console.log('Evet seçeneği seçildi.');
          return true;
        } else {
          console.log('Hayır seçeneği seçildi.');
          return false;
        }
      });
    } else {
      return Promise.resolve(false);
    }
  }

 
}
