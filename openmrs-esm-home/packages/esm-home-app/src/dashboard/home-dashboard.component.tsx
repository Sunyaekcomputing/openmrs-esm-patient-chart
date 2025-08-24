import React from 'react';
import { useParams } from 'react-router-dom';
import {
  useLayoutType,
  isDesktop,
  useExtensionStore,
  WorkspaceContainer,
  useConfig,
} from '@openmrs/esm-framework';
import type { DashboardConfig } from '../types/index';
import DashboardView from './dashboard-view.component';
import styles from './home-dashboard.scss';
import classNames from 'classnames';
import { type ConfigSchema } from '../config-schema';

export default function HomeDashboard() {
  const params = useParams();
  const extensionStore = useExtensionStore();
  const layout = useLayoutType();
  const { leftNavMode } = useConfig<ConfigSchema>();
  
  const ungroupedDashboards =
    extensionStore.slots['homepage-dashboard-slot']?.assignedExtensions
      .map((e) => e.meta)
      .filter((e) => Object.keys(e).length) || [];

  // Log dashboard names to console for inspection
  console.log('Available homepage dashboards:', ungroupedDashboards);

  const dashboards = ungroupedDashboards as Array<DashboardConfig>;
  const activeDashboard = dashboards.find((dashboard) => dashboard.name === params?.dashboard) || dashboards[0];
  console.log('active dashboards:', activeDashboard.name);
  const extensionsInSlot = extensionStore.slots[activeDashboard.slot]?.assignedExtensions || [];
  console.log('Extensions in slot', activeDashboard.slot, extensionsInSlot.map(e => e.meta.name));

  return (
    <div className={styles.homePageWrapper}>
      <section
        className={classNames([
          isDesktop(layout) ? styles.dashboardContainer : styles.dashboardContainerTablet,
        ])}
      >
        {activeDashboard && (
          <DashboardView title={activeDashboard.name} dashboardSlot={activeDashboard.slot} />
        )}
      </section>
      <WorkspaceContainer overlay contextKey="home" />
    </div>
  );
}
