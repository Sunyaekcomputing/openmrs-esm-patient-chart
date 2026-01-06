import React, { type ComponentProps, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionMenuButton,
  DocumentIcon,
  launchWorkspace,
  useWorkspaces,
  getCurrentUser,
} from '@openmrs/esm-framework';
import {
  clinicalFormsWorkspace,
  formEntryWorkspace,
  htmlFormEntryWorkspace,
  useLaunchWorkspaceRequiringVisit,
} from '@openmrs/esm-patient-common-lib';

const INITIAL_FORM_UUID = '30413aeb-e448-46c3-b2c1-52e19233906f';
const FOLLOW_UP_FORM_UUID = '55b82773-3cd0-4813-a38e-9d0c1ea35e45'; // replace with actual follow-up form UUID

function getPatientUuidFromUrl(): string | null {
  const match = window.location.pathname.match(/\/patient\/([^/]+)/);
  return match ? match[1] : null;
}

const ClinicalFormActionButton: React.FC = () => {
  const { t } = useTranslation();
  const { workspaces } = useWorkspaces();
  const launchFormsWorkspace = useLaunchWorkspaceRequiringVisit(clinicalFormsWorkspace);
  const hasLaunchedRef = useRef(false);

  const formEntryWorkspaces = workspaces.filter((w) => w.name === formEntryWorkspace);
  const htmlFormEntryWorkspaces = workspaces.filter((w) => w.name === htmlFormEntryWorkspace);

  const launchPatientWorkspaceCb = () => {
    if (formEntryWorkspaces.length > 0) {
      launchWorkspace(formEntryWorkspace, {
        workspaceTitle: formEntryWorkspaces[0]?.additionalProps?.['workspaceTitle'],
      });
      return;
    }

    if (htmlFormEntryWorkspaces.length > 0) {
      launchWorkspace(htmlFormEntryWorkspace, {
        workspaceTitle: htmlFormEntryWorkspaces[0]?.additionalProps?.['workspaceTitle'],
      });
      return;
    }

    launchFormsWorkspace();
  };

  // -------- AUTO LAUNCH --------
  useEffect(() => {
    const patientUuid = getPatientUuidFromUrl();
    if (!patientUuid || hasLaunchedRef.current) return;

    const sub = getCurrentUser().subscribe(async (session) => {
      const user = session?.user;
      if (!user) return;

      const isSelfRegistrationUser = user.roles?.some((r) => r.display === 'self registration');

      hasLaunchedRef.current = true;

      try {
        let formToOpen = INITIAL_FORM_UUID;
        let workspaceTitle = 'काउन्सिलर फारम';

        if (isSelfRegistrationUser) {
          // check if initial form already exists
          const res = await fetch(
            `/openmrs/ws/rest/v1/encounter?patient=${patientUuid}&form=${INITIAL_FORM_UUID}&v=custom:(uuid,encounterDatetime,form:(uuid,name))`
          );
          const data = await res.json();
          const isInitialFormFilled = data.results?.length > 0;

          formToOpen = isInitialFormFilled ? FOLLOW_UP_FORM_UUID : INITIAL_FORM_UUID;
          workspaceTitle = isInitialFormFilled ? 'Follow-up काउन्सिलर फारम' : 'काउन्सिलर फारम';
        }

        // launch workspace
        setTimeout(() => {
          launchWorkspace(formEntryWorkspace, {
            workspaceTitle,
            formInfo: {
              patientUuid,
              formUuid: formToOpen,
              encounterUuid: undefined,
              visitUuid: undefined,
              visitTypeUuid: undefined,
              visitStartDatetime: undefined,
              visitStopDatetime: undefined,
              htmlForm: null,
            },
          });
        }, 300);
      } catch (err) {
        console.error('Error checking previous encounters:', err);
        // fallback: launch initial form anyway
        launchFormsWorkspace();
      }
    });

    return () => sub.unsubscribe();
  }, []);

  return (
    <ActionMenuButton
      getIcon={(props: ComponentProps<typeof DocumentIcon>) => <DocumentIcon {...props} />}
      label={t('clinicalForms', 'Clinical forms')}
      iconDescription={t('clinicalForms', 'Clinical forms')}
      handler={launchPatientWorkspaceCb}
      type="clinical-form"
    />
  );
};

export default ClinicalFormActionButton;
