import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@NgModule({
    exports:[
        NzAvatarModule,
        NzButtonModule,
        NzDrawerModule,
        NzGridModule,
        NzIconModule,
        NzLayoutModule,
        NzMenuModule,
    ]
})
export class NgZorroAntdModule {}
