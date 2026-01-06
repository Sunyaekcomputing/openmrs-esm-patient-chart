import React, { useEffect, useMemo, useState, useCallback } from "react";
import { navigate, openmrsFetch, restBaseUrl, fhirBaseUrl } from "@openmrs/esm-framework";
import { launchWorkspace } from "@openmrs/esm-framework";
// import { formEntryWorkspace } from "@openmrs/esm-patient-common-lib";

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

type SearchResult = {
  found: boolean;
  patient?: SearchedPatient;
};

export default function HomePageHeader({ dashboardTitle }: { dashboardTitle: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [patientLists, setPatientLists] = useState<PatientList[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const baseUrl = (window.getOpenmrsSpaBase?.() ?? "/openmrs/spa").replace(/\/$/, "");

  // 🔽 ADDED (ART ID search state)
  const [artIdInput, setArtIdInput] = useState("");
  const [artSearchResult, setArtSearchResult] = useState<SearchResult | null>(null);

  useEffect(() => {
    openmrsFetch<{ user: User }>(`${restBaseUrl}/session`)
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error("[HomePageHeader] Error fetching session:", err));
  }, []);

  const userRoles = useMemo(() => {
    return user?.roles?.map((r) => r.display.toLowerCase()) || [];
  }, [user]);

  useEffect(() => {
    const fetchRecentPatients = async () => {
      try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const since = sevenDaysAgo.toISOString();

       const res = await openmrsFetch<{ entry?: { resource: SearchedPatient }[] }>(
  `${fhirBaseUrl}/Patient?_count=1000&_sort=-_lastUpdated`
);


        const patients =
          res.data.entry?.map((e) => {
            const patient = e.resource;
            return {
              ...patient,
              artId:
                patient.identifier?.find((id) =>
                  id.type?.text?.toLowerCase().includes("आफ्नो एआरटि  आईडी लेख्नुहोस्")
                )?.value || "",
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

    if (userRoles.length) {
      fetchRecentPatients();
    }
  }, [userRoles]);

  // 🔽 ADDED (exact ART ID search logic)
 const searchByArtIdExact = () => {
  if (!artIdInput.trim()) return;

  // use all members from patientLists
  const allPatients = patientLists[0]?.members || [];

  const matched = allPatients.find((p) =>
    p.identifier?.some(
      (id) =>
        id.type?.text?.trim() === "आफ्नो एआरटि  आईडी लेख्नुहोस्" &&
        id.value === artIdInput.trim()
    )
  );

  if (matched) {
    setArtSearchResult({ found: true, patient: matched });
  } else {
    setArtSearchResult({ found: false });
  }
};



  const addPatient = useCallback(() => {
    navigate({ to: `${baseUrl}/patient-registration` });
  }, [baseUrl]);

  const openChart = async (patient: SearchedPatient) => {
    if (!patient.id) return;
    navigate({ to: `${baseUrl}/patient/${patient.id}/chart` });
  };

  const displayedPatients = useMemo(() => {
    const allPatients = patientLists[0]?.members || [];
    if (!searchTerm.trim()) return allPatients;

    return allPatients.filter((p) =>
      p.artId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, patientLists]);

  return (
    <>
      {!userRoles.includes("self registration") ? (
        <>
          {/* 🔽 ADDED ART ID SEARCH UI (does NOT replace existing UI) */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
  <div style={{
    width: "420px",
    textAlign: "center",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#f5fdf9",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
  }}>
    
     <button
        onClick={addPatient}
        style={{
          flex: 1,
          background: "#005d5d",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          padding: "1rem",
          fontSize: "1.1rem",
          fontWeight: 700,
          cursor: "pointer",
          
        }}
      >
     ✍🏻 नयाँ दर्ता गर्नुहोस्
      </button>
    <div style={{
      marginTop: "8px",
      fontSize: "0.95rem",
      fontWeight: "700", // 🔹 Bold text
      color: "#555",
    }}>
      आफ्नो एआरटि आईडी राख्नुहोस्
    </div>
    

    <div style={{ display: "flex", gap: "12px", marginTop: "18px" }}>
     <input
  type="text"
  value={artIdInput}
  onChange={(e) => {
    setArtIdInput(e.target.value);
    setArtSearchResult(null); // Clear previous search result when typing
  }}
  placeholder="ART ID"
  style={{
    width: "50%",       // much smaller width
    padding: "0.25rem",   // reduced padding
    fontSize: "0.9rem",   // smaller font
    borderRadius: "3px",  // smaller border radius
    border: "1.5px solid #007f7f",
    outline: "none",
    height: "30px",
  }}
/>



      <button
        onClick={searchByArtIdExact}
        style={{
          flex: 1,
          background: "#007f7f",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          padding: "0",
          fontSize: "1.1rem",
          fontWeight: 700,
          cursor: "pointer",
          height: "30px",
          textAlign: "center",
          justifyContent: "center"
        }}
      >
        🔍 खोज्नुहोस्
      </button>

      
    </div>

              {artSearchResult?.found === true && artSearchResult.patient && (
  <div style={{ marginTop: "18px" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 16px",
        backgroundColor: "#e6f7f0",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: 600,
        color: "#007f7f",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
      onClick={() => openChart(artSearchResult.patient!)}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d0f0e5")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e6f7f0")}
    >
      <span>
        {artSearchResult.patient.identifier?.find(
          (id) => id.type?.text?.trim() === "आफ्नो एआरटि  आईडी लेख्नुहोस्"
        )?.value || "N/A"}
      </span>
      <span>
        {artSearchResult.patient.name?.[0]?.text ||
          `${artSearchResult.patient.name?.[0]?.given?.join(" ") || ""} ${
            artSearchResult.patient.name?.[0]?.family || ""
          }`}
      </span>
    </div>
  </div>
)}


              {artSearchResult?.found === false && (
                <div style={{ marginTop: "18px", color: "red", fontWeight: 600 }}>
                  ❌ ART ID भेटिएन
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* ⬇⬇⬇ ORIGINAL NON-SELF-REGISTRATION CODE — UNTOUCHED ⬇⬇⬇ */
        <div style={{ marginTop: "80px", marginLeft: "40px", fontFamily: "Noto Sans Devanagari, sans-serif" }}>
          <h3 style={{ color: "#339E71", fontSize: "2.4rem", marginBottom: "25px" }}>
            🧾 हालै दर्ता भएका सहभागीहरू
          </h3>

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
                <th style={{ padding: "14px 18px", textAlign: "left", width: "55%" }}>
                  सहभागीको एआरटि आईडी
                  <input
                    type="text"
                    placeholder="खोज्नुहोस्..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      marginLeft: "10px",
                      padding: "6px 10px",
                      fontSize: "0.9rem",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      width: "180px",
                    }}
                  />
                </th>
                <th style={{ padding: "14px 18px", textAlign: "left" }}>दर्ता मिति</th>
              </tr>
            </thead>

            <tbody>
              {displayedPatients.length === 0 ? (
                <tr>
                  <td colSpan={2} style={{ padding: "12px 18px", fontStyle: "italic" }}>
                    कुनै सहभागी भेटिएन
                  </td>
                </tr>
              ) : (
                displayedPatients.map((p, idx) => (
                  <tr
                    key={p.id}
                    onClick={() => openChart(p)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: idx % 2 === 0 ? "#f9fdf9" : "#ffffff",
                    }}
                  >
                    <td style={{ padding: "12px 18px" }}>{p.artId}</td>
                    <td style={{ padding: "12px 18px" }}>
                      {p.registeredDate ? new Date(p.registeredDate).toLocaleString() : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
