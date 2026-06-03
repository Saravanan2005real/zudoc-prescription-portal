# Zudoc Prescription Portal - Architecture Documentation

This document describes the application architecture, system layout, data flow, and component organization of the Zudoc Prescription Portal.

---

## 1. Architectural Overview

The Zudoc Prescription Portal is a single-page React application powered by Vite, TypeScript, and Tailwind CSS. The architecture revolves around a **unidirectional state orchestrator** at the root (`App.tsx`) backed by domain-specific custom React hooks (`usePatient` and `usePrescription`). 

The interface adapts dynamically depending on whether a patient has been searched and verified:
1. **Selection Phase (Split Screen)**: 50/50 split layout for searching and verifying patient identity.
2. **Prescribing Phase (Three-Column Layout)**: Full workspace featuring collapsible sidebars for prescription history (left) and AI Clinical Assistance (right) with the active medical workspace in the center.

---

## 2. System Architecture Diagram

Below is the Mermaid diagram representing the component hierarchy, state flow, and user workflows:

```mermaid
graph TD
    %% Colors and Styles
    classDef orchestrator fill:#dbeafe,stroke:#2563eb,stroke-width:2px;
    classDef hook fill:#fef08a,stroke:#ca8a04,stroke-width:2px;
    classDef views fill:#f3e8ff,stroke:#7c3aed,stroke-width:1px;
    classDef modals fill:#fee2e2,stroke:#dc2626,stroke-width:1px;
    classDef ui fill:#f1f5f9,stroke:#64748b,stroke-width:1px;

    %% Elements
    App[App.tsx <br/>State Orchestrator & Router]:::orchestrator
    usePatient[usePatient.ts <br/>Patient & Vitals State]:::hook
    usePrescription[usePrescription.ts <br/>Prescription Form State]:::hook

    %% Subgraphs
    subgraph InitializationScreen [1. Patient Verification Screen]
        Search[PatientSearch]:::views
        Overview[PatientOverviewPopup]:::views
        IdentityConfirm[PatientConfirmationModal]:::modals
    end

    subgraph ActiveWorkspace [2. Three-Column Prescription Workspace]
        Tabs[Specialty Selector Tabs <br/>General | Ayurveda | Dental | Siddha | Nursing | Veterinary]:::ui
        
        subgraph Col1 [Column 1: History & Summary]
            SummaryPanel[EnhancedPrescriptionSummary <br/>Left Sidebar - Collapsible]:::views
        end
        
        subgraph Col2 [Column 2: Workspace Forms]
            DocWorkspace[DoctorWorkspace / SpecialtyWorkspaces <br/>Center Pane - Scrollable]:::views
            MedForm[ImprovedMedicationForm]:::views
            LabForm[LabTestForm]:::views
            RadForm[RadiologyForm]:::views
            SurgForm[SurgeryForm]:::views
        end

        subgraph Col3 [Column 3: AI Co-Pilot]
            AIPanel[TabbedAIPanel <br/>Right Sidebar - Collapsible]:::views
            ClinicalAdvice[Clinical Advice Component]:::views
            Interactions[Drug Interaction Safety Check]:::views
        end
    end

    subgraph FinalizationModals [3. Review & Submission Flow]
        ReviewModal[ReviewModal <br/>Prescription Draft Preview]:::modals
        AnalysisModal[AnalysisModal <br/>AI-Driven Drug Safety Report]:::modals
        SignModal[SignAndSendModal <br/>Digital Signature & Dispatch]:::modals
        SuccessModal[SuccessModal <br/>Receipt & Zudoc Dispatch Confirmation]:::modals
    end

    %% Relationships
    App --> usePatient
    App --> usePrescription
    
    %% Flow mapping
    usePatient --> Search
    usePatient --> Overview
    Overview --> IdentityConfirm
    
    %% Workspace connections
    App --> Tabs
    Tabs --> Col1
    Tabs --> Col2
    Tabs --> Col3

    %% Workspace Form communication
    DocWorkspace --> MedForm
    DocWorkspace --> LabForm
    DocWorkspace --> RadForm
    DocWorkspace --> SurgForm

    %% Dynamic Data bindings
    DocWorkspace -- Field Focus / Search Query --> App
    App -- Sync Context --> AIPanel
    SummaryPanel -- Copy Past Items --> usePrescription
    AIPanel -- Inject Suggestion --> usePrescription
    
    %% Submission Flow
    App --> ReviewModal
    ReviewModal --> AnalysisModal
    AnalysisModal --> SignModal
    SignModal --> SuccessModal
```

---

## 3. Data Flow and State Management

### A. Core Hooks (State Holders)
1. **`usePatient`**:
   - Manages the selected patient profile (`Patient | null`).
   - Tracks whether the patient's identity is verified (`isPatientConfirmed`).
   - Tracks if the practitioner has bypassed the entry screen (`proceedToPrescription`).
   - Houses mutations for vitals updating and switching patients.
2. **`usePrescription`**:
   - Holds state for symptoms (text), diagnoses (array), medications (array), labs (array), surgeries (array), and notes.
   - Provides helper methods to append, update, and remove items (e.g., `handleAddMedication`, `handleEditMedication`, `handleRemoveMedication`).
   - Handles specialty-specific states (e.g., Ayurvedic treatments, dental conditions, nursing instructions, veterinary vitals).
   - Manages draft restore capabilities (`restorePrescription`) and draft resetting.

### B. Inter-Component Communication
* **Field-Focus-Driven AI Context**: 
  When a user focuses an input field in [DoctorWorkspace](file:///c:/Users/Saravanan/Desktop/Zudoc/Prescriptioncreationinterface-main/src/app/components/prescription/doctor-workspace.tsx) (e.g., "Medications" or "Diagnosis"), it bubbles up an event via `onFieldFocus`. This updates the active AI tab and search context in `App.tsx`, which triggers [TabbedAIPanel](file:///c:/Users/Saravanan/Desktop/Zudoc/Prescriptioncreationinterface-main/src/app/components/ai/tabbed-ai-panel.tsx) to query relevant drug details, database entries, or clinical guidance automatically.
  
* **Historical Copy-Paste**:
  [EnhancedPrescriptionSummary](file:///c:/Users/Saravanan/Desktop/Zudoc/Prescriptioncreationinterface-main/src/app/components/prescription/enhanced-prescription-summary.tsx) reads the patient's past prescriptions. When a doctor clicks "Copy" or "Add to current" on past medications or symptoms, the summary panel invokes callbacks that append those items straight into the active `usePrescription` state.

---

## 4. Components Directory Structure

```
src/
├── app/
│   ├── components/            # UI components
│   │   ├── ai/                # AI Co-pilot panels (Advice, Interactions, Dictionary)
│   │   ├── modals/            # Workflow modals (Review, Analysis, Sign & Send, Success)
│   │   ├── patient/           # Patient search, overview profile, verification bar
│   │   ├── prescription/      # Main doctor workspace and nested medical sub-forms
│   │   │   └── workspaces/    # Specialty workspaces (Ayurveda, Siddha, Dental, Nursing, Vet)
│   │   ├── shared/            # Common UI shells (Top navigation bar)
│   │   └── ui/                # Base primitives (Buttons, Cards, Dialogs, Badges, Tabs)
│   ├── data/                  # Static mock database for patients and clinical entries
│   ├── hooks/                 # Custom React hooks managing domain business logic
│   ├── types/                 # TypeScript interfaces declaring domain types
│   ├── utils/                 # General helpers (Tailwind merge, styling utilities)
│   ├── App.tsx                # Main state hub, layouts, and page routing
│   └── main.tsx               # Client entrypoint
└── styles/
    └── index.css              # Styling guidelines, fonts, and Tailwind directives
```

---

## 5. Specialty Workspace Design Pattern

To keep workspaces modular, each specialty portal (e.g. [Ayurveda](file:///c:/Users/Saravanan/Desktop/Zudoc/Prescriptioncreationinterface-main/src/app/components/prescription/workspaces/ayurveda-workspace.tsx), [Dental](file:///c:/Users/Saravanan/Desktop/Zudoc/Prescriptioncreationinterface-main/src/app/components/prescription/workspaces/dental-workspace.tsx), [Siddha](file:///c:/Users/Saravanan/Desktop/Zudoc/Prescriptioncreationinterface-main/src/app/components/prescription/workspaces/siddha-workspace.tsx), etc.) imports `commonWorkspaceProps` from the orchestrator. 

This contract guarantees that:
* Every workspace can read and modify the active patient profile and prescription state.
* The focus states bubble up consistently to drive the AI panel on the right.
* Data fields (such as SNOMED CT codes and drug details) are standardized.

---

## 6. Verification and Submission Flow

Submission is handled in a strict 4-stage pipeline protecting patient safety:

```
[Save Draft] ---> [Review Modal] ---> [AI Safety Analysis] ---> [Sign & Send] ---> [Success Screen]
```

1. **Review**: High-level preview of all diagnoses, medications, labs, and radiology orders.
2. **Analysis**: AI runs drug-to-drug interactions, allergy cross-checks, and dosage checks, flagging severe warnings before the doctor can proceed.
3. **Sign & Send**: Input registration details, signature validation, and optional passcode verification.
4. **Success**: Generates final RxID, triggers printing options, and prepares the next patient queue.
