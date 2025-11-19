# PrintGrid – Mobile Photo Page Builder

## 1. Product Name (Working)
**PrintGrid – Mobile Photo Page Builder**

---

## 2. One-Sentence Summary
A hyper-minimal mobile-first tool that lets users quickly create print-ready pages, arrange multiple photos with auto-subject-centering, and export high-quality PDFs in just a few taps.

---

## 3. Core Objectives
- Make printing small or multiple photos on standard paper sizes extremely fast and simple.  
- Allow both **single-page quick creation** and **bulk generation** of multiple pages.  
- Ensure outputs are **print-ready PDFs**, **no compression**, and follow exact physical dimensions.

---

## 4. Design Language & Style
- **Hyper minimal** interface  
- Whites, greys, blacks — similar to Notion or Vercel’s Geist  
- **Geist font**  
- Compact spacing, clean edges  
- Large touch targets for mobile usability  

---

## 5. Default Behavior
- Load with a default **4 × 6 in** page  
- Default photo size: **2.5 × 2.5 in**  
- Default shape: **square**  
- Auto-calculate how many photos fit per page  
- Users may customize:
  - Page size  
  - Photo size  
  - Shapes (square or circle)  
  - Margins + spacing  

---

## 6. Intelligent Image Handling

### Auto Subject Detection & Smart Crop
Every uploaded image should:
- Detect main subject (face/object)  
- Center subject automatically  
- Maintain aspect ratio  
- Fit inside a square or circular frame  
- Avoid stretching or warping  

---

## 7. Page Layout Logic

### Grid Fitting Algorithm
Inputs:
- Page width & height (in inches)  
- Photo width & height (in inches)  
- Margins  
- Spacing  

Outputs:
- Photos per row  
- Rows per page  
- Total photos per page  

Ensure print-accurate sizing (300 DPI).

Example:
- 4 × 6 in page  
- 2.5 × 2.5 in photos  
- Fits two photos by default  

---

## 8. Export Requirements
- Export to **PDF**  
- **300 DPI** or higher  
- True physical scaling (1 in = 300 px)  
- No compression  
- Embedded sRGB profile  
- Allow:
  - Save as file  
  - Share  
  - Direct print  

---

## 9. User Flows

### Flow A — Quick 3–4 Tap Single Page
1. Open → auto 4×6 page  
2. Upload photos  
3. Auto-fit into layout  
4. Export or Print  

Total: 3–4 taps.

---

### Flow B — Bulk Print (30 Photos → 15 Pages)
1. Open **Bulk Mode**  
2. Upload all photos  
3. Auto-generate pages (2 per page)  
4. Export as:
   - Multi-page PDF  
   - Separate PDFs  
   - Direct print  

---

## 10. Main Screens

### 1. Home / New Project
- Page size presets + custom  
- Default project auto-started  

### 2. Canvas
- Add Photos  
- Settings  
- Bulk Mode  
- Export  

### 3. Bulk Mode Screen
- Upload grid  
- Photos-per-page selector  
- Auto-page preview  

### 4. Export Screen
- DPI fixed at 300  
- Filename  
- Export / Print  

---

## 11. Feature Checklist

### Must-Haves
- Mobile-first UI  
- PDF export without compression  
- Auto subject detection  
- Smart crop & centering  
- Custom page + photo sizes  
- Multi-photo layout  
- Bulk mode pagination  
- Direct print  

### Nice-to-Haves
- Save templates  
- Save projects  
- Snap-to-grid  
- Small text labels  

---

## 12. Technical Notes

### Rendering & DPI
- 300 DPI rendering  
- PDF engine uses physical units (point → inch mapping)  
- Respect device pixel ratio  

### Image Processing
- Use lightweight ML models (MediaPipe / YOLO-lite)  
- Prefer client-side privacy  

### Color Handling
- Default sRGB  
- Printer-safe rendering  
