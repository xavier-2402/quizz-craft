import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
    AppstoreOutline,
    EditOutline,
    HomeOutline,
    MailOutline,
    SettingOutline,
    UserOutline
} from '@ant-design/icons-angular/icons';

const icons = [
    AppstoreOutline,
    EditOutline,
    HomeOutline,
    MailOutline,
    SettingOutline,
    UserOutline
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class IconsProviderModule {
}
