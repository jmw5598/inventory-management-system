import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { IAppState } from '@dashboard/core/store/state';
import { CreateStockItemModalComponent, CreateStockItemModalCloseResponse } from '../../components/create-stock-item-modal/create-stock-item-modal.component';

@Component({
  selector: 'inv-manage-stock-items',
  templateUrl: './manage-stock-items.component.html',
  styleUrls: ['./manage-stock-items.component.scss']
})
export class ManageStockItemsComponent implements OnInit {

  constructor(
    private _store: Store<IAppState>,
    private _modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  public showCreateStockItemModal(): void {
    const modalRef: NzModalRef = this._modalService.create({
      nzMaskClosable: false,
      nzCloseIcon: '',
      nzTitle: 'Create New Stock Item',
      nzContent: CreateStockItemModalComponent 
    })

    modalRef.afterClose
      .subscribe((data: CreateStockItemModalCloseResponse) => {
        if (data.hasStockItemsBeenCreated) {
          console.log("Create new stock item, refresh table");
          // TODO refresh the table?
        }
      })
  }
}
