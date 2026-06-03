# Zudoc Prescription Portal - Design & UX Specification

This document details the visual guidelines, design tokens, layout structures, and UX principles that govern the Zudoc Prescription Portal user interface.

---

## 1. Design Philosophy

The interface is engineered to feel like a premium, state-of-the-art clinical workstation. It rejects boring hospital-software styles in favor of a sleek **modern dashboard** featuring:
* **Glassmorphism Elements**: Translucent containers with soft backdrops that feel light and premium.
* **Vibrant Harmonic Accents**: Tailwind gradients using cobalt blues, cyan tones, violet purples, and emerald greens rather than flat saturated colors.
* **Micro-Animations**: Smooth hover-scaling, glowing focus rings, sliding sidebars, and pulse indicators for live status.
* **High Contrast & Clarity**: Generous typography hierarchies and high-contrast clinical indicators to ensure legibility in stressful environments.

---

## 2. Design Tokens & Theme Variables

The project uses CSS custom properties defined in `@theme inline` (configured inside [theme.css](file:///c:/Users/Saravanan/Desktop/Zudoc/Prescriptioncreationinterface-main/src/styles/theme.css)).

### A. Color Palette (Light Mode Tokens)
* **Background**: `#ffffff` with a linear gradient of `#f8fafc` (Slate 50), `#eff6ff` (Blue 50), and `#f5f3ff` (Violet 50) for depth.
* **Primary (Text & Headers)**: Deep charcoal navy `#030213`.
* **Secondary**: Pale slate/ice-blue `oklch(0.95 0.0058 264.53)`.
* **Muted / Border**: Light gray `#ececf0` / transparent border `rgba(0, 0, 0, 0.1)`.
* **Destructive**: Rich Crimson `#d4183d`.
* **Active Status / Confirmed**: Gradient `from-blue-600 to-cyan-600`.
* **Pending Status / Review Needed**: Gradient `from-purple-600 to-pink-600`.

### B. Typography
The system uses the modern, geometric Sans-serif typeface (**Inter / System Sans**) ensuring clarity at small sizes.
* **Titles (h1, h2)**: Semibold, Tracking tight, line-height 1.5.
* **UI Elements (Buttons, Badges)**: Medium weight (`--font-weight-medium: 500`).
* **Input Fields**: Normal weight (`--font-weight-normal: 400`), font size 16px (to prevent auto-zooming on mobile iOS safari).

---

## 3. Layout Patterns and Responsive Architecture

### A. The Three-Column Layout
When a patient is verified, the viewport partitions into three distinct vertical sections:

```
+------------------+----------------------------------+--------------------+
| Left Collapsible |          Center Pane             | Right Collapsible  |
|     Sidebar      |       (Independent Scroll)       |      Sidebar       |
|    (320px px)    |                                  |     (384px px)     |
|                  |                                  |                    |
|  Prescription    |         Specialty Forms          |    AI Clinical     |
|   Summary &      |                                  |    Co-pilot &      |
|    History       |   [Medications, Labs, Notes]     |   Safety Checks    |
+------------------+----------------------------------+--------------------+
```

* **Left Sidebar**: 320px width. Houses patient's clinical history and live prescription summary. Collapses completely to give more space for writing.
* **Center Pane**: Flexible width. Scrollable context containing all input fields for the active clinical specialty.
* **Right Sidebar**: 384px width. Dedicated AI Assistant. Features a tabbed layout displaying drug safety warnings, synonyms, dictionary lookup, and SNOMED codes.

### B. Glassmorphism Panel Styling
Custom cards and overlays are styled to create a glass-like depth:
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.04);
}
```

---

## 4. UI Elements & Form Controls

### A. Focus Indicators & Input Fields
All form textboxes, select dropdowns, and checkboxes use custom styles:
* **Interactive Focus State**: When focused, inputs display a subtle colored glow (`ring-2 ring-primary/20`) to guide the doctor's focus.
* **Field Focus AI Hooks**: Focusing an input triggers an active state in the AI Panel, instantly surfacing relevant context.

### B. Command Badges and Indicators
Badges are used to convey status and origin:
* **`✓ Verified`**: Cobalt blue to cyan gradient, giving confirmation.
* **`⚠️ Allergy`**: Saturated crimson gradient, demanding immediate attention.
* **`AI Suggestion`**: Purple-to-indigo gradient, indicating an item was injected via AI.

---

## 5. Micro-Animations and UX Details

1. **Collapsible Transitions**: Sidebars collapse and expand with a smooth `duration-300` transition.
2. **Success Feedback**: Upon signing a prescription, a checkmark animation draws in, accompanied by a confetti-like gradient transition on the success modal.
3. **Live Auto-Save Indicator**: A small green dot in the bottom bar pulses softly, updating the timestamp when local state changes.
4. **Safety Alerts**: Safety alerts in the AI tab utilize high-contrast warning colors (amber for minor warning, red for critical interaction alerts) and subtle vibration hints to prevent clinical oversights.
