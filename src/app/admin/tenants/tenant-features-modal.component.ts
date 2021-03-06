﻿import { Component, ViewChild, Injector } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { TenantServiceProxy, UpdateTenantFeaturesInput, TenantEditDto, EntityDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { FeatureTreeComponent } from '../shared/feature-tree.component';

import * as _ from "lodash";

@Component({
    selector: 'tenantFeaturesModal',
    templateUrl: './tenant-features-modal.component.html'
})
export class TenantFeaturesModalComponent extends AppComponentBase {

    @ViewChild('tenantFeaturesModal') modal: ModalDirective;
    @ViewChild('featureTree') featureTree: FeatureTreeComponent;

    active: boolean = false;
    saving: boolean = false;

    resettingFeatures: boolean = false;
    tenantId: number;
    tenantName: string;
    featureEditData: any = null;

    constructor(
        injector: Injector,
        private _tenantService: TenantServiceProxy
    ) {
        super(injector);
    }

    show(tenantId: number, tenantName: string): void {
        this.tenantId = tenantId;
        this.tenantName = tenantName;
        this.active = true;
        this.loadFeatures();
        this.modal.show();
    }

    loadFeatures(): void {
        let self = this;
        self._tenantService.getTenantFeaturesForEdit(this.tenantId).subscribe((result) => {
            self.featureTree.editData = result;
        });
    }

    save(): void {
        if (!this.featureTree.areAllValuesValid()) {
            this.message.warn(this.l('InvalidFeaturesWarning'));
            return;
        }

        
        let input = new UpdateTenantFeaturesInput();
        input.id = this.tenantId;
        input.featureValues = this.featureTree.getGrantedFeatures();

        this.saving = true;
        this._tenantService.updateTenantFeatures(input)
            .finally(() => this.saving = false)
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
            });
    }

    resetFeatures(): void {
        var input = new EntityDto();
        input.id = this.tenantId;

        this.resettingFeatures = true;
        this._tenantService.resetTenantSpecificFeatures(input)
            .finally(() => this.resettingFeatures = false)
            .subscribe(() => {
                this.notify.info(this.l('ResetSuccessfully'));
                this.loadFeatures();
            });
    };

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}