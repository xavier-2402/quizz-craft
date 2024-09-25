import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
    AppstoreOutline,
    EditOutline,
    EyeOutline,
    FilePdfFill,
    FilePptFill,
    HomeOutline,
    LockOutline,
    MailOutline,
    SendOutline,
    SettingOutline,
    UserOutline,
} from '@ant-design/icons-angular/icons';

const icons = [
    AppstoreOutline,
    EditOutline,
    EyeOutline,
    FilePdfFill,
    FilePptFill,
    HomeOutline,
    LockOutline,
    MailOutline,
    SendOutline,
    SettingOutline,
    UserOutline,
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
