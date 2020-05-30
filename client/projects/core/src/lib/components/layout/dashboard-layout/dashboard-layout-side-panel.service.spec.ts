import { TestBed } from '@angular/core/testing';

import { DashboardLayoutSidePanelService } from './dashboard-layout-side-panel.service';

describe('DashboardLayoutSidePanelService', () => {
  let service: DashboardLayoutSidePanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardLayoutSidePanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
