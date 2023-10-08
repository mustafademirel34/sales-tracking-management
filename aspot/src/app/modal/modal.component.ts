import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  // aslında @input olmadan veri gönderebiliyoruz?
  baslik: string = '';
  secenekolacakmi:boolean=false;

  modalResult: Promise<boolean> | undefined;

  @Input() formErrorList: string[] = [];
  


  private modalResultResolve: ((result: boolean) => void) | undefined;

  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    // ...
  }

  closeModal(result: boolean): void {
    this.bsModalRef.hide();
    if (this.modalResultResolve) {
      this.modalResultResolve(result);
    }
  }

  confirm(): void {
    this.closeModal(true);
  }

  cancel(): void {
    this.closeModal(false);
  }

  openModal(secenek:boolean,baslik: string): Promise<boolean> {
    this.baslik = baslik;
    this.secenekolacakmi=secenek;

    this.modalResult = new Promise<boolean>((resolve) => {
      this.modalResultResolve = resolve;
    });

    return this.modalResult;
  }
}
