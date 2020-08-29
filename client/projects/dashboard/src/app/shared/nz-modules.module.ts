import { NgModule } from '@angular/core';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete'
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography'

import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons)
  .map(key => antDesignIcons[key])

@NgModule({
  imports: [
    NzIconModule.forRoot(icons)
  ],
  exports: [
    NzAlertModule,
    NzAutocompleteModule,
    NzAvatarModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzCardModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzEmptyModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzInputNumberModule,
    NzLayoutModule,
    NzListModule,
    NzMenuModule,
    NzModalModule,
    NzNotificationModule,
    NzPageHeaderModule,
    NzPopconfirmModule,
    NzRadioModule,
    NzSelectModule,
    NzSpinModule,
    NzStatisticModule,
    NzStepsModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzTypographyModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class NgZorroModule {}