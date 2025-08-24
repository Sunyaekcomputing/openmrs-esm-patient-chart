import React, { useEffect, useMemo, useState, useCallback } from "react";
import { navigate, openmrsFetch, restBaseUrl, fhirBaseUrl } from "@openmrs/esm-framework";

/**
 * --- Types ---
 */
type User = {
  uuid: string;
  username: string;
  roles: { display: string }[];
};

export interface SearchedPatient {
  id: string;
  name?: { text?: string; given?: string[]; family?: string }[];
  identifier?: { system?: string; value?: string; type?: { text?: string } }[];
  gender?: string;
  birthDate?: string;
  meta?: { lastUpdated?: string };
  displayName?: string;
  artId?: string;
  registeredDate?: string;
}

export interface PatientList {
  id: string;
  name: string;
  members: SearchedPatient[];
}

/**
 * --- HomePageHeader Component ---
 */
export default function HomePageHeader({ dashboardTitle }: { dashboardTitle: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [patientLists, setPatientLists] = useState<PatientList[]>([]);
  const baseUrl = (window.getOpenmrsSpaBase?.() ?? "/openmrs/spa").replace(/\/$/, "");

  // --- Fetch current user session ---
  useEffect(() => {
    openmrsFetch<{ user: User }>(`${restBaseUrl}/session`)
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error("[HomePageHeader] Error fetching session:", err));
  }, []);

  const userRoles = useMemo(() => {
    return user?.roles?.map((r) => r.display.toLowerCase()) || [];
  }, [user]);

  // --- Fetch recently registered patients from FHIR ---
  useEffect(() => {
    const fetchRecentPatients = async () => {
      try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const since = sevenDaysAgo.toISOString();

        const res = await openmrsFetch<{ entry?: { resource: SearchedPatient }[] }>(
          `${fhirBaseUrl}/Patient?_lastUpdated=ge${since}&_sort=-_lastUpdated&_count=20`
        );

        const patients =
          res.data.entry?.map((e) => {
            const patient = e.resource;
            return {
              ...patient,
              artId:
                patient.identifier?.find((id) =>
                  id.type?.text?.toLowerCase().includes("सहभागीको एआरटि आईडी")
                )?.value || "N/A",
              registeredDate: patient.meta?.lastUpdated || "N/A",
            };
          }) || [];

        setPatientLists([
          {
            id: "recent-patients",
            name: "हालै दर्ता भएका सहभागीहरू",
            members: patients,
          },
        ]);
      } catch (err) {
        console.error("[HomePageHeader] Error fetching recent patients:", err);
      }
    };

    // Only fetch if NOT self registration
    if (userRoles.length && !userRoles.includes("self registration")) {
      fetchRecentPatients();
    }
  }, [userRoles]);

  const addPatient = useCallback(() => {
    navigate({ to: `${baseUrl}/patient-registration` });
  }, [baseUrl]);

  const openChart = useCallback(
    (patient: SearchedPatient) => {
      if (patient.id) {
        navigate({ to: `${baseUrl}/patient/${patient.id}/chart` });
      }
    },
    [baseUrl]
  );

  // --- UI ---
  return (
    <>
      {userRoles.includes("self registration") ? (
        // ✅ Only show दर्ता गर्नुहोस् button if role = self registration
        <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
          <button
            style={{
              background: "linear-gradient(145deg, #005d5d, #007f7f)",
              color: "#fff",
              border: "none",
              borderRadius: "80px",
              padding: "2rem 3.5rem",
              fontSize: "2rem",
              fontWeight: 900,
              fontFamily: "Noto Sans Devanagari, sans-serif",
              cursor: "pointer",
              boxShadow: "0px 6px 12px rgba(0,0,0,0.25)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={addPatient}
          >
            ✍🏻 दर्ता गर्नुहोस्
          </button>
        </div>
      ) : (
        // ✅ Otherwise, show recently registered patients
        <div style={{ marginTop: "80px", marginLeft: "40px", fontFamily: "Noto Sans Devanagari, sans-serif" }}>
          <h3 style={{ color: "#339E71", fontSize: "2.4rem", marginBottom: "25px" }}>
            🧾 हालै दर्ता भएका सहभागीहरू
          </h3>

          {patientLists.map((list) => (
            <div key={list.id} style={{ marginBottom: "40px" }}>
              {list.members.length === 0 ? (
                <p style={{ fontStyle: "italic" }}>कुनै नयाँ सहभागी दर्ता भएका छैनन्</p>
              ) : (
                <table
                  style={{
                    width: "70%",
                    borderCollapse: "collapse",
                    fontSize: "1.1rem",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#005d5d", color: "#fff" }}>
                      <th
                        style={{
                          padding: "14px 18px",
                          textAlign: "left",
                          fontSize: "18px",
                          fontWeight: "600",
                        }}
                      >
                        सहभागीको एआरटि आईडी
                      </th>
                      <th style={{ padding: "14px 18px", textAlign: "left" }}>दर्ता मिति</th>
                    </tr>
                  </thead>

                  <tbody>
                    {list.members.map((p, idx) => (
                      <tr
                        key={p.id}
                        onClick={() => openChart(p)}
                        style={{
                          cursor: "pointer",
                          backgroundColor: idx % 2 === 0 ? "#f9fdf9" : "#ffffff",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e6f7f0")}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            idx % 2 === 0 ? "#f9fdf9" : "#ffffff")
                        }
                      >
                        <td style={{ padding: "12px 18px" }}>{p.artId}</td>
                        <td style={{ padding: "12px 18px" }}>
                          {p.registeredDate ? new Date(p.registeredDate).toLocaleString() : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
