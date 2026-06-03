# Zudoc Prescription Portal

A premium, state-of-the-art clinical prescription creation workspace. Zudoc allows medical practitioners to efficiently search patients, verify vitals, construct multi-specialty prescriptions, cross-check drug safety via an AI Assistant, and sign/dispatch prescriptions digitally.

---

## 🌟 Key Features

* **Multi-Specialty Workspaces**: Tailored interfaces for General Medicine, Ayurveda, Dental, Siddha, Nursing, and Veterinary care.
* **Intelligent Split-Screen Verification**: A dedicated screen to lookup patients, inspect vitals, and verify patient identity before entering the workspace.
* **Three-Column Clinical Layout**:
  - **Left Panel (History & Summary)**: Collapsible sidebar detailing the current prescription progress and previous clinical records with one-click append capabilities.
  - **Center Panel (Active Workspace)**: Form interfaces for medication prescriptions, laboratory tests, radiology procedures, and surgical scheduling.
  - **Right Panel (AI Co-pilot)**: A context-aware assistant providing live clinical advice, drug-to-drug safety interactions, and SNOMED CT terminology dictionary search.
* **Safety & Signoff Pipeline**:
  - **Draft Auto-save**: Local draft backups updated automatically.
  - **AI Safety Check**: Allergy checks, duplicate drug detection, and interaction level warnings.
  - **Digital Signature**: Register signature verification, register number entry, and delivery confirmation.

---

## 🛠️ Technology Stack

* **Framework**: React 18, TypeScript 5
* **Bundler & Server**: Vite 6
* **Styling**: Tailwind CSS v4, Radix UI primitives, Lucide Icons, Emotion CSS
* **Feedback Notifications**: Sonner rich toasts
* **State Management**: Custom React Hooks (`usePatient`, `usePrescription`)

---

## 📂 Repository Structure

The portal is structured cleanly into logical domain boundaries:

* **[src/app/App.tsx](file:///c:/Users/Saravanan/Desktop/Zudoc/Prescriptioncreationinterface-main/src/app/App.tsx)**: Main page layout router and state synchronizer.
* **[src/app/components/](file:///c:/Users/Saravanan/Desktop/Zudoc/Prescriptioncreationinterface-main/src/app/components/)**:
  - `ai/`: AI Assistant advice tabs, drug interactions panel.
  - `modals/`: Review drafts, Safety analysis reports, Sign-off, and Success windows.
  - `patient/`: Lookup components, patient identity bars, and vitals updates.
  - `prescription/`: Workspace forms, medication inputs, lab orders, and specialty portals.
* **[src/app/hooks/](file:///c:/Users/Saravanan/Desktop/Zudoc/Prescriptioncreationinterface-main/src/app/hooks/)**: State managers (`use-patient`, `use-prescription`).
* **[src/app/types/](file:///c:/Users/Saravanan/Desktop/Zudoc/Prescriptioncreationinterface-main/src/app/types/)**: Shared TS type safety definitions.

---

## 📖 Deep Dives & Specifications

For deep design and code architectures, see:
* **[ARCHITECTURE.md](file:///c:/Users/Saravanan/Desktop/Zudoc/Prescriptioncreationinterface-main/ARCHITECTURE.md)**: System design diagrams, components relationships, and hook layouts.
* **[DESIGN.md](file:///c:/Users/Saravanan/Desktop/Zudoc/Prescriptioncreationinterface-main/DESIGN.md)**: Aesthetic guidelines, color tokens, layout, and micro-animation specs.

---

## 🚀 Getting Started

Follow these steps to run the portal locally:

### 1. Install Dependencies
Ensure you have Node.js installed, then install the package dependencies:
```bash
npm install
```

### 2. Run the Development Server
Launch the local Vite server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
Generate the production-ready build output:
```bash
npm run build
```
The optimized bundle will be compiled into the `dist/` directory.