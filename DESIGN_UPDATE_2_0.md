# CryptoMind 2.0 - Premium Design & Feature Update

This update introduces a comprehensive visual overhaul and new advanced features, elevating CryptoMind to a premium, futuristic "DeFi/Cyberpunk" aesthetic.

## 🎨 Visual Design System

### Glassmorphism & Depth
*   **Global Theme**: A consolidated dark theme (`#0f172a` base) with vibrant neon accents (#22D3EE Cyan, #7C3AED Violet).
*   **Component Styling**:
    *   **Glass Panels**: All Cards, Drawers, and Overlays now use `backdrop-filter: blur(12px-20px)` with translucent backgrounds.
    *   **Depth**: Subtle borders (`1px solid rgba(255,255,255,0.05)`) and glow effects (`box-shadow`) create a sense of layering.
    *   **Backgrounds**: A consistent radial gradient + grid pattern adds texture to the entire app.

### Animations
*   **Entrance**: `fadeIn`, `slideUp` animations for smoother page loads.
*   **Interactive**: `pulse` effects on critical alerts and FABs.
*   **Micro-interactions**: Hover states on buttons and list items feature distinct glow and scale effects.

### Typography
*   **Hebrew Support**: Optimized font weights and letter spacing for readability.
*   **Hierarchy**: Clear distinction between headings (Extra Bold) and body text, often using colored accents for emphasis.

## 🚀 Key Feature Updates

### 1. Dashboard (Home)
*   **AI Insight Engine**: Main feature card with glass styling and dynamic "Processing" states.
*   **Hero Sections**: Updated with entrance animations.

### 2. Time Machine (Backtester)
*   **Visual Upgrade**: Now uses a premium dashboard layout.
*   **Chart**: Styled LineChart with gradient fills and custom tooltips.
*   **Input**: Clean, glass-styled form controls.

### 3. Portfolio Galaxy (3D)
*   **Overlay UI**: New HUD-style overlays with gradients and glass effects.
*   **Legend**: Clearer visual guide for the 3D elements.

### 4. Edge AI Analyst (WebLLM)
*   **Chat Interface**: "Message Bubble" styling updated to match the glass theme.
*   **Privacy Badge**: Highlighted "Zero Data Egress" feature.

### 5. Market Sonification
*   **Experience**: Full-screen glass card visualizer.
*   **Visualizer**: Dynamic bars that react to "market data" (mocked) with color gradients.

### 6. Stress Test (Risk Management)
*   **Urgency Visuals**: "Critical" scenarios now trigger red glow and pulse effects to signal danger.
*   **Results**: Clearer visualization of potential losses vs. safe allocations.

### 7. Whale Watch (On-Chain)
*   **"The Ocean"**: A dedicated visual area for whale transaction bubbles.
*   **Live Feed**: Sidebar feed with improved readability and categorization icons.

## Only on First Load
*   **Welcome Tour**: A new dialog introduces users to the new features upon their first visit (tracked via LocalStorage).

---

## 🛠️ Tech Stack Notes
*   **MUI v5**: Heavily customized via `theme.ts` and `sx` props.
*   **Tailwind / Global CSS**: Utility classes for animations (`animate-pulse`, `animate-fade-in`).
*   **Recharts**: Custom styled charts.
*   **React Three Fiber**: For the Galaxy view.
