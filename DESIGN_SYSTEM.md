# Physics Simulator - Modern Dark Theme Design System

## 🎨 Color Palette

### Background Colors
- **Primary Background**: `#0F0F0F` - Deep dark for main canvas
- **Secondary Background**: `#1E1E1E` - Panels and cards
- **Tertiary Background**: `#2A2A2A` - Borders and dividers

### Accent Colors
- **Primary Gradient**: `#4F46E5` → `#8B5CF6` (Indigo to Purple)
- **Velocity Vector**: `#EF4444` → `#F97316` (Red to Orange)
- **Success/Active**: `#8B5CF6` (Purple)
- **Error**: `#EF4444` with `rgba(239, 68, 68, 0.1)` background

### Text Colors
- **Primary Text**: `#F5F5F5` - Headers
- **Secondary Text**: `#E5E5E5` - Body text
- **Tertiary Text**: `#B0B0B0` - Labels
- **Muted Text**: `#A0A0A0` - Placeholders
- **Disabled Text**: `#666`

## 🔤 Typography

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

### Font Sizes & Weights
- **H1 (Header)**: 32px, Bold (700), -0.5px letter-spacing
- **H2 (Section)**: 20px, Bold (700), -0.3px letter-spacing
- **H3 (Subsection)**: 14px, Semibold (600), 0.5px letter-spacing, uppercase
- **Body**: 14-16px, Regular (400)
- **Labels**: 13px, Semibold (600), 0.5px letter-spacing, uppercase
- **Small**: 13px, Regular (400)

## 🎭 Visual Effects

### Shadows
```css
/* Card Shadow */
box-shadow: 
  0 8px 32px rgba(0, 0, 0, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.05);

/* Button Shadow */
box-shadow: 
  0 4px 16px rgba(79, 70, 229, 0.3),
  inset 0 1px 0 rgba(255, 255, 255, 0.2);

/* Hover Glow */
box-shadow: 
  0 6px 24px rgba(79, 70, 229, 0.4),
  0 0 40px rgba(79, 70, 229, 0.3);
```

### Borders
- **Standard**: `1px solid #2A2A2A`
- **Active/Focus**: `1px solid #4F46E5`
- **Gradient Accent**: `linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.5), transparent)`

### Border Radius
- **Cards/Panels**: `16px`
- **Buttons**: `10px`
- **Inputs**: `10px`
- **Small Elements**: `8px`

### Transitions
```css
transition: all 0.3s ease;
```

## 🎯 Component Styles

### Buttons
- **Background**: Linear gradient `#4F46E5` → `#8B5CF6`
- **Hover**: Translate Y(-2px) + enhanced glow
- **Active**: Translate Y(0)
- **Disabled**: 50% opacity
- **Shimmer Effect**: Animated gradient overlay on hover

### Input Fields
- **Background**: `#0F0F0F`
- **Border**: `1px solid #2A2A2A`
- **Focus**: Border `#4F46E5` + glow effect
- **Inset Shadow**: `inset 0 2px 8px rgba(0, 0, 0, 0.3)`

### Sliders
- **Track**: `#0F0F0F` with inset shadow
- **Thumb**: Gradient `#4F46E5` → `#8B5CF6`
- **Thumb Size**: 20px
- **Hover**: Scale(1.15) + enhanced glow
- **Glow Ring**: `0 0 0 4px rgba(79, 70, 229, 0.1)`

### Cards/Panels
- **Background**: `#1E1E1E`
- **Border**: `1px solid #2A2A2A`
- **Top Accent**: Gradient line at top
- **Shadow**: Multi-layer with inset highlight

## 🎬 Animations

### Pulse Animation (Placeholder)
```css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}
```

### Shimmer Effect (Buttons)
```css
/* Animated gradient overlay */
background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
transition: left 0.5s;
```

### Hover Transitions
- **Transform**: translateY(-2px) or translateX(4px)
- **Duration**: 0.3s ease
- **Glow**: Fade in shadow effects

## 🖼️ Canvas Rendering

### Simulation Canvas
- **Background**: `#0F0F0F`
- **Ground Line**: Gradient `rgba(79, 70, 229, 0.3)` → `rgba(139, 92, 246, 0.3)`
- **Ground Shadow**: `rgba(79, 70, 229, 0.05)`

### Physics Object
- **Gradient**: Radial `#8B5CF6` → `#4F46E5`
- **Glow**: `rgba(139, 92, 246, 0.4)` with 30px radius
- **Shadow**: `shadowBlur: 15, shadowColor: rgba(139, 92, 246, 0.8)`

### Trajectory Path
- **Gradient**: `rgba(79, 70, 229, 0.3)` → `rgba(139, 92, 246, 0.8)`
- **Line Width**: 3px
- **Dash Pattern**: [8, 4]
- **Glow**: `shadowBlur: 10, shadowColor: rgba(79, 70, 229, 0.5)`

### Velocity Vector
- **Gradient**: `#EF4444` → `#F97316`
- **Line Width**: 4px
- **Glow**: `shadowBlur: 10, shadowColor: rgba(239, 68, 68, 0.6)`

### Info Panel (Canvas)
- **Background**: `rgba(30, 30, 30, 0.8)`
- **Border**: `rgba(79, 70, 229, 0.5)`
- **Text**: `#E5E5E5`, Bold 15px Inter

## 🌐 Background Effects

### Body Background
```css
background: #0F0F0F;
background-image: 
  radial-gradient(at 0% 0%, rgba(79, 70, 229, 0.15) 0px, transparent 50%),
  radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.15) 0px, transparent 50%);
```

### Header
- **Background**: `rgba(30, 30, 30, 0.8)`
- **Backdrop Filter**: `blur(20px)`
- **Border**: `rgba(79, 70, 229, 0.2)`
- **Sticky**: Top position with z-index 100

## 📱 Responsive Design

### Breakpoint: 968px
- Stack layout vertically
- Left panel becomes full width
- Maintain padding and spacing ratios

## ✨ Key Design Principles

1. **Depth Through Layers**: Multiple shadow layers create depth
2. **Subtle Glows**: Accent colors glow on hover/active states
3. **Gradient Accents**: Linear/radial gradients for visual interest
4. **Smooth Transitions**: All interactions feel fluid (0.3s ease)
5. **Dark Theme Contrast**: Light text on dark backgrounds with proper hierarchy
6. **Professional Polish**: Inset highlights, border accents, backdrop blur
7. **Interactive Feedback**: Hover states with transform + glow effects
8. **Consistent Spacing**: 24px gaps, 16px border radius, 14px padding

## 🎯 Judge-Ready Features

- ✅ Modern dark theme (not generic)
- ✅ Professional gradient accents
- ✅ Smooth animations and transitions
- ✅ Glowing interactive elements
- ✅ Depth through layered shadows
- ✅ Clean typography hierarchy
- ✅ Polished canvas rendering
- ✅ Consistent design language
- ✅ Attention to micro-interactions
- ✅ Production-quality aesthetics
