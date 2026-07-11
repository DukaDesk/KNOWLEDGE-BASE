# Rendering Engine Architecture

**KB-052 — Rendering Engine Architecture Specification**

| Metadata | |
|----------|---|
| **KB ID** | KB-052 |
| **Title** | Rendering Engine Architecture |
| **Version** | 0.1.0 |
| **Status** | Draft |
| **Owner** | Architecture Team |
| **Suite** | Runtime & Rendering Architecture |
| **Dependencies** | KB-051 Runtime Architecture Overview, KB-046 Component Tree Model, KB-045 Screen Model, KB-049 Theme & Design Token Model, KB-047 Action & Event Model, KB-044 Navigation Architecture, KB-012 Component Registry |
| **Related Documents** | KB-053 SDUI Architecture, KB-054 Runtime State Management, KB-056 Runtime Component Registry, KB-057 Runtime Event & Action Pipeline, KB-008 Runtime Overview, KB-009 Manifest Specification, KB-042 Application Manifest Specification, KB-043 Workspace & Tenant Model |
| **Review Status** | Pending |
| **Last Updated** | 2026-07-11 |

---

### Revision History

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 0.1.0 | 2026-07-11 | AI Architecture Agent | Initial draft |

---

## 1. Executive Summary

### 1.1 Purpose

This document defines the Rendering Engine Architecture for the DUKADESK platform. The Rendering Engine is the subsystem within the Runtime responsible for transforming declarative screen definitions into rendered, interactive user interfaces on the target platform.

The Rendering Engine occupies the critical path between application definitions and user experience. Every screen, component, layout, data binding, theme token, and action handler passes through the Rendering Engine. Its architecture directly determines application performance, responsiveness, consistency, and cross-platform behavior.

This document is the detailed specification of the Renderer subsystem introduced in KB-051 Runtime Architecture Overview (section 5.6). It defines the Rendering Engine's internal architecture, rendering pipeline, component lifecycle, layout model, data binding strategy, responsive adaptation model, performance model, error handling, and platform adaptation mechanisms.

### 1.2 Scope

This document covers:

- Rendering Engine architecture: subsystems, pipeline stages, data flow
- Screen resolution: from screen identifier to rendered output
- Component resolution: from component identifier to mounted component instance
- Layout model: composition, containers, sizing, positioning, overflow, scroll, z-order
- Data binding: sources, resolution modes, reactivity, transformation
- Theme binding: token resolution, mode adaptation, inheritance
- Action binding: handler registration, trigger wiring, argument resolution
- Component lifecycle: resolve, instantiate, bind, mount, update, unmount, destroy
- Screen lifecycle: load, render, appear, interact, background, disappear
- Responsive adaptation: breakpoints, density, orientation, input modality
- Incremental rendering: virtualization, deferred rendering, priority-based rendering
- Error handling: error boundaries, fallback rendering, graceful degradation
- Platform adaptation layer: renderers, layout engines, input handling
- Performance model: render budget, frame timing, measurement, optimization strategies

Out of scope:

- Component Registry implementation (handled by KB-056)
- Theme Engine implementation (handled by KB-017 and KB-049)
- State Management implementation (handled by KB-054)
- Action Dispatcher implementation (handled by KB-057)
- Navigation Engine implementation (handled by KB-055)
- Specific component implementations (handled by component authors)
- Platform-specific rendering optimizations (handled by platform adaptation layer)

---

## 2. Rendering Engine Architecture

### 2.1 Position Within the Runtime

The Rendering Engine is one of several cooperating subsystems within the Runtime. It receives resolved definitions from upstream subsystems and produces rendered output on the target platform.

```
┌─────────────────────────────────────────────────────────────┐
│                        Runtime                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Manifest │  │ Package  │  │ Theme    │  │ Navigation│   │
│  │ Resolver │  │ Resolver │  │ Engine   │  │ Engine   │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │              │             │              │          │
│       ▼              ▼             ▼              ▼          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Rendering Engine                     │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌────────┐  │   │
│  │  │ Screen  │→│ Layout  │→│Component│→│Platform │  │   │
│  │  │ Resolver│  │ Engine  │  │ Renderer│  │ Adapter │  │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│       │              │             │              │          │
│       ▼              ▼             ▼              ▼          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Component │  │  State   │  │  Action  │  │   Event  │   │
│  │ Registry │  │ Manager  │  │Dispatcher│  │   Bus    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Subsystem Overview

The Rendering Engine is composed of four internal subsystems:

| Subsystem | Primary Responsibility |
|-----------|----------------------|
| Screen Resolver | Receive screen identifiers, resolve screen definitions, validate structure, produce resolved screen models for rendering |
| Layout Engine | Parse screen layout definitions, construct spatial hierarchies, compute positions and dimensions, manage overflow, scroll, and z-order |
| Component Renderer | Resolve component implementations from the Component Registry, instantiate components, bind properties, data, theme, and actions, manage component lifecycle |
| Platform Adapter | Abstract platform-specific rendering, layout, and input handling behind a unified interface |

### 2.3 Rendering Pipeline

The Rendering Engine processes screen definitions through a linear pipeline. Each stage transforms the definition toward platform-specific rendered output.

```
Screen Request
    │
    ▼
┌─────────────────────┐
│  1. Screen Load     │  Fetch + validate screen definition
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  2. Definition Parse │  Parse layout, component refs, bindings
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  3. Component       │  Resolve all component implementations
│     Resolution      │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  4. Layout Compute   │  Build spatial tree, compute positions
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  5. Data Binding     │  Bind state values, theme tokens, actions
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  6. Component Mount  │  Instantiate + mount each component
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  7. Platform Render  │  Delegate to platform adapter for output
└────────┬────────────┘
         │
         ▼
    Rendered Screen
```

#### 2.3.1 Stage 1 — Screen Load

The Screen Resolver receives a screen request from the Navigation Engine. The request includes a screen identifier, optional parameters, and navigation context. The Screen Resolver fetches the screen definition from the cache or Manifest Resolver, validates it against the screen schema, and produces a resolved Screen Model.

**Input**: Screen identifier, parameters, navigation context
**Output**: Resolved Screen Model
**Failure**: Screen not found → navigation fallback. Screen invalid → validation error with details.

#### 2.3.2 Stage 2 — Definition Parse

The Layout Engine parses the screen's layout definition into an internal layout tree. The layout tree is a structured representation of the screen's component hierarchy, including containers, spacers, dividers, and leaf components. Each node carries its layout properties — size constraints, alignment, margins, padding, flex behavior.

**Input**: Resolved Screen Model
**Output**: Layout tree (abstract syntax tree of layout nodes)
**Failure**: Malformed layout definition → partial rendering with error markers.

#### 2.3.3 Stage 3 — Component Resolution

The Component Renderer traverses the layout tree and resolves each component reference against the Component Registry. For each component, it retrieves the component's registered implementation, property schema, and platform-specific renderer. Components that fail resolution receive fallback placeholder components.

**Input**: Layout tree
**Output**: Resolved component tree (each node linked to its registered component implementation)
**Failure**: Unregistered component identifier → placeholder/fallback component. Version mismatch → nearest compatible version.

#### 2.3.4 Stage 4 — Layout Compute

The Layout Engine performs spatial computation on the resolved component tree. It calculates each component's position and dimensions based on its layout properties, parent container constraints, and sibling relationships. Layout computation respects the platform's layout model (flexbox on web, auto layout on native) through the Platform Adapter.

**Input**: Resolved component tree
**Output**: Positioned component tree (each node with computed bounds)
**Failure**: Unsolvable layout constraints → constraint relaxation with warning. Overflow → scroll container insertion.

#### 2.3.5 Stage 5 — Data Binding

The Component Renderer binds runtime data to each component. Data sources include state values from the State Manager, theme tokens from the Theme Engine, action handlers from the Action Dispatcher, and static configuration values from the screen definition. Binding resolution follows a defined precedence: explicit values override state bindings, state bindings override defaults, defaults override fallbacks.

**Input**: Positioned component tree
**Output**: Bound component tree (each node with resolved property values)
**Failure**: Missing state path → fallback value or empty state. Invalid theme token → default token value.

#### 2.3.6 Stage 6 — Component Mount

The Component Renderer instantiates each component and mounts it into the rendering tree. Mounting involves creating the component instance, applying bound properties, registering event handlers, subscribing to state changes, and inserting the component into the visual tree. Mount order follows the layout tree hierarchy — parents mount before children, siblings mount in document order.

**Input**: Bound component tree
**Output**: Mounted component tree (live component instances)
**Failure**: Component instantiation failure → error boundary activation. Mount timeout → fallback UI.

#### 2.3.7 Stage 7 — Platform Render

The Platform Adapter receives the mounted component tree and delegates to the platform-specific rendering system. On mobile, this maps to native view hierarchies. On web, this maps to DOM elements. On desktop, this maps to the desktop UI framework. The Platform Adapter handles platform-specific concerns — coordinate systems, event dispatch, accessibility, input handling.

**Input**: Mounted component tree
**Output**: Platform-rendered visual output
**Failure**: Platform rendering error → platform error boundary. Memory pressure → graceful degradation.

---

## 3. Screen Resolution

### 3.1 Screen Model

The Screen Resolver operates on the Screen Model defined in KB-045. A resolved screen consists of:

```
Screen {
  id: string
  type: ScreenType          // standard, modal, wizard, embedded
  layout: LayoutDefinition
  components: ComponentDefinition[]
  dataBindings: DataBinding[]
  themeOverrides: ThemeOverride[]
  actions: ActionBinding[]
  permissions: PermissionRule[]
  lifecycle: ScreenLifecycleHooks
  responsive: ResponsiveRules
  metadata: ScreenMetadata
}
```

### 3.2 Resolution Process

Screen resolution follows a deterministic process:

1. **Cache Check** — The screen definition is looked up in the Runtime cache. Cache hit returns the cached definition. Cache miss proceeds to definition fetch.
2. **Definition Fetch** — The screen definition is loaded from the Manifest Resolver. The definition may be embedded in the Manifest or referenced by URI.
3. **Schema Validation** — The definition is validated against the Screen Schema. Structural validity is enforced — required fields must be present, field types must match, references must be resolvable.
4. **Reference Resolution** — Component references, data source references, theme token references, and action references are resolved to their concrete definitions. Circular references are detected and rejected.
5. **Permission Evaluation** — Permission rules on the screen are evaluated against the current user context. Screens the user is not authorized to view are blocked with a permission error.
6. **Responsive Selection** — If the screen defines responsive variants, the variant matching the current platform context is selected. Variant selection considers platform type, screen dimensions, orientation, and input modality.
7. **Theme Application** — Screen-level theme overrides are applied on top of the active theme. Theme tokens referenced by the screen are validated against the resolved theme.
8. **Screen Model Construction** — The resolved Screen Model is assembled from the validated and resolved definitions.

### 3.3 Screen Parameters

Screens accept parameters passed from navigation actions or deep links. Parameters are typed, validated against the screen's parameter schema, and made available to the screen's components through the parameter binding source.

```
Screen Parameter Definition (in Manifest):
{
  "screen": "order-detail",
  "parameters": {
    "orderId": { "type": "string", "required": true },
    "tab": { "type": "string", "required": false, "default": "items" }
  }
}
```

---

## 4. Layout Model

### 4.1 Layout Definition

Layouts are defined declaratively as a tree of layout nodes. Each node represents either a container (which holds child nodes) or a leaf component. The layout tree mirrors the visual hierarchy of the screen.

```
Layout Definition (JSON):
{
  "layout": {
    "type": "column",
    "padding": 16,
    "spacing": 12,
    "children": [
      {
        "type": "row",
        "align": "center",
        "spacing": 8,
        "children": [
          { "type": "component", "component": "avatar", "size": 40 },
          { "type": "component", "component": "heading", "text": "{order.number}" }
        ]
      },
      {
        "type": "component",
        "component": "status-badge",
        "status": "{order.status}"
      },
      {
        "type": "column",
        "flex": 1,
        "children": [
          { "type": "component", "component": "product-list" }
        ]
      }
    ]
  }
}
```

### 4.2 Layout Node Types

| Node Type | Behavior | Properties |
|-----------|----------|------------|
| `row` | Lays out children horizontally | spacing, align, justify, wrap, reverse |
| `column` | Lays out children vertically | spacing, align, justify, reverse |
| `stack` | Layers children on top of each other (z-order) | align, justify |
| `scroll` | Wraps a single child in a scrollable viewport | direction, showsScrollbar, pagingEnabled |
| `spacer` | Takes remaining space in the parent | minSize, flex |
| `divider` | Renders a visual separator | orientation, thickness, color |
| `component` | Renders a registered component | component, props, flex, align, sizing |
| `conditional` | Renders children based on a condition | condition, then, else |
| `repeat` | Renders children for each item in a data source | source, itemKey, template |
| `safe-area` | Insets children within platform safe area | edges |

### 4.3 Layout Properties

Every layout node supports a common set of layout properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | dimension | auto | Explicit width (px, %, dp) |
| `height` | dimension | auto | Explicit height |
| `minWidth` | dimension | 0 | Minimum width constraint |
| `maxWidth` | dimension | none | Maximum width constraint |
| `flex` | number | 0 | Flex grow factor in parent container |
| `flexShrink` | number | 1 | Flex shrink factor |
| `alignSelf` | alignment | auto | Alignment override for this node |
| `margin` | edgeInsets | 0 | Outer spacing |
| `padding` | edgeInsets | 0 | Inner spacing |
| `position` | positioning | relative | Relative or absolute positioning |
| `top` / `left` / `right` / `bottom` | dimension | auto | Absolute position offsets |
| `visible` | boolean | true | Visibility — invisible nodes maintain layout space |
| `opacity` | number (0-1) | 1 | Opacity of the node and its children |
| `zIndex` | number | 0 | Stacking order within parent |
| `elevation` | number | 0 | Shadow/elevation (platform-specific) |

### 4.4 Layout Computation

Layout computation proceeds in two phases:

**Phase 1 — Measure**: Each node determines its desired size based on its content, intrinsic size, and explicit sizing properties. Containers measure their children recursively. The measure phase respects flex grow/shrink constraints within each container.

**Phase 2 — Layout**: Each node receives its final position and size from its parent container. The layout phase assigns bounds to each child based on measured sizes, alignment, justification, and spacing. Absolute-positioned nodes are placed at their specified offsets.

### 4.5 Overflow and Scroll

Nodes whose content exceeds their allocated bounds trigger overflow handling:

1. **Overflow detection** — After layout computation, nodes whose children extend beyond their bounds are flagged.
2. **Scroll container insertion** — Flagged containers are automatically wrapped in a scroll node unless explicitly configured to clip or expand.
3. **Directional scroll** — Scroll direction is determined by the overflow direction (horizontal, vertical, both).
4. **Scroll indicators** — Platform-appropriate scroll indicators are rendered.

### 4.6 Z-Order

Z-order is determined by three factors in precedence order:

1. **Explicit zIndex** — Nodes with a specified zIndex are stacked accordingly.
2. **Layout tree depth** — Children stack above parents (deeper nodes render on top).
3. **Sibling order** — Later siblings stack above earlier siblings in the same parent.

The Stack layout type provides explicit z-order management for overlay and modal use cases.

---

## 5. Component Resolution

### 5.1 Resolution Process

The Component Renderer resolves each component reference in the layout tree to a concrete component instance. Resolution follows a multi-step process:

1. **Registry Lookup** — The component identifier is looked up in the Component Registry. The registry returns the component's registered definition — its property schema, default property values, event contracts, and platform implementations.
2. **Property Schema Validation** — The component's declared properties from the screen definition are validated against the component's property schema. Invalid or unexpected properties are rejected with warnings.
3. **Default Application** — Default values from the component's schema are applied for any required properties not explicitly provided.
4. **Platform Selection** — The platform-specific implementation is selected from the component's registered implementations. If the exact platform is not available, the nearest compatible platform implementation is used.
5. **Version Resolution** — If multiple versions of the component are registered, the version matching the component reference's version constraint is selected. The latest compatible version within the constraint is preferred.

### 5.2 Component Properties

Properties are provided to components through three mechanisms:

| Mechanism | Source | Precedence |
|-----------|--------|------------|
| Explicit | Defined inline in the screen definition | Highest |
| Data-bound | References a state value or data source | Medium |
| Default | From the component's property schema | Lowest |

Property resolution checks each mechanism in precedence order. The first resolved value is used.

### 5.3 Component Fallback

When a component cannot be resolved, the Rendering Engine employs a fallback chain:

1. **Placeholder component** — A generic placeholder is rendered showing the component name and a "not available" indicator. The placeholder occupies the same layout space as the intended component, preserving layout integrity.
2. **Error boundary** — If the placeholder is not suitable, the error boundary catches the resolution failure and renders the boundary's fallback UI.
3. **Layout removal** — As a last resort, the unresolved component is removed from the layout tree, and sibling components reflow to fill the gap.

---

## 6. Data Binding

### 6.1 Binding Model

Data binding connects component properties to runtime data sources. Bindings are defined declaratively in the screen definition and resolved at render time.

```
Data Binding Definition:
{
  "bindings": [
    {
      "target": "heading.text",
      "source": "state",
      "path": "order.number",
      "transform": "uppercase",
      "fallback": "Order #---"
    },
    {
      "target": "avatar.uri",
      "source": "state",
      "path": "order.restaurant.logo"
    }
  ]
}
```

### 6.2 Binding Sources

| Source | Provider | Resolution | Reactivity |
|--------|----------|------------|------------|
| `state` | State Manager | Path-based lookup into application state | Re-renders on state change |
| `theme` | Theme Engine | Token-based lookup | Re-renders on theme switch |
| `params` | Navigation Engine | Screen parameter lookup | Static for screen duration |
| `context` | Runtime Context | Context path lookup | Changes with context |
| `static` | Screen Definition | Literal value | Never changes |
| `computed` | Binding Engine | Expression evaluation against sources | Re-evaluates on dependency change |
| `localized` | Localization Service | Key-based lookup with locale | Re-renders on locale change |

### 6.3 Binding Resolution

Each binding is resolved following a resolution pipeline:

1. **Source identification** — The binding source determines which provider to query.
2. **Path resolution** — The path is traversed on the provider's data structure. Nested paths (e.g., `order.items[0].name`) are supported.
3. **Type coercion** — The resolved value is coerced to the target property's expected type. Type mismatches trigger fallback.
4. **Transformation** — Optional transform functions are applied (uppercase, lowercase, currency formatting, date formatting, truncation).
5. **Fallback application** — If resolution fails at any step, the defined fallback value is used. If no fallback is defined, the component's default value is used.

### 6.4 Reactivity

Data bindings are reactive by default. When a bound state value changes, the Rendering Engine triggers a targeted re-render of only the components that depend on that value.

Reactivity model:

1. Each binding registers a subscription to its source during component mount.
2. When the source publishes a change, the binding engine identifies all dependent components.
3. Dependent components are queued for re-render in the next frame.
4. Re-renders are batched — multiple changes to the same component within a frame result in a single re-render.
5. Unused bindings are unsubscribed during component unmount.

### 6.5 Computed Bindings

Computed bindings derive values from one or more source bindings through a transform expression. Computed bindings are evaluated lazily — they compute only when a dependency changes.

```
Computed Binding:
{
  "target": "total.text",
  "source": "computed",
  "expression": "formatCurrency(subtotal + tax + tip, locale)",
  "dependencies": [
    { "source": "state", "path": "order.subtotal" },
    { "source": "state", "path": "order.tax" },
    { "source": "state", "path": "order.tip" },
    { "source": "context", "path": "locale" }
  ]
}
```

---

## 7. Theme Binding

### 7.1 Token Resolution

Theme tokens are resolved through the Theme Engine and applied to component properties. Token references in screen definitions follow the `{token.path}` syntax.

```
Theme Binding Example:
{
  "component": "heading",
  "props": {
    "color": "{color.primary}",
    "fontSize": "{typography.heading.size}",
    "fontWeight": "{typography.heading.weight}",
    "marginBottom": "{spacing.md}"
  }
}
```

### 7.2 Resolution Order

Theme token resolution follows a precedence chain:

1. **Screen-level override** — Theme overrides defined at the screen level take highest precedence.
2. **Component-level override** — Theme overrides defined for a specific component instance.
3. **Theme mode variant** — Tokens specific to the active theme mode (light, dark, high-contrast).
4. **Theme default** — The token value from the active theme definition.
5. **Platform default** — Fallback to platform-default token values.

### 7.3 Mode Adaptation

When the theme mode changes (e.g., user switches from light to dark mode), the Rendering Engine:

1. Receives a mode change event from the Theme Engine.
2. Re-resolves all theme-dependent bindings.
3. Triggers targeted re-renders of only the components affected by changed tokens.
4. Animates transitions for components that define transition properties.

---

## 8. Action Binding

### 8.1 Action Wiring

Actions are wired to component events through action bindings in the screen definition. Each action binding specifies the triggering event, the action to execute, and optional arguments.

```
Action Binding:
{
  "component": "checkout-button",
  "bindings": {
    "onPress": {
      "action": "navigate",
      "params": {
        "screen": "checkout",
        "mode": "push"
      }
    },
    "onLongPress": {
      "action": "show-tooltip",
      "params": {
        "text": "Proceed to payment"
      }
    }
  }
}
```

### 8.2 Argument Resolution

Action arguments support the same binding mechanisms as component properties — static values, state bindings, theme tokens, and computed expressions. Arguments are resolved at action execution time, not at bind time.

---

## 9. Component Lifecycle

### 9.1 Lifecycle Stages

Every rendered component passes through a defined lifecycle:

```
┌──────────┐
│ Resolved │  Component identifier resolved to registered definition
└────┬─────┘
     │
     ▼
┌──────────┐
│Created   │  Component instance created with default properties
└────┬─────┘
     │
     ▼
┌──────────┐
│ Bound    │  Properties, data bindings, theme, and actions applied
└────┬─────┘
     │
     ▼
┌──────────┐
│ Mounted  │  Component inserted into the visual tree, visible to user
└────┬─────┘
     │
     ▼
┌──────────┐
│ Updated  │  Component re-rendered in response to state, theme, or prop changes
└────┬─────┘
     │
     ▼
┌──────────┐
│Unmounted │  Component removed from the visual tree
└────┬─────┘
     │
     ▼
┌──────────┐
│ Destroyed│  Component resources released, subscriptions cleaned up
└──────────┘
```

### 9.2 Lifecycle Hooks

Components may implement lifecycle hooks to participate in their lifecycle:

| Hook | Timing | Purpose |
|------|--------|---------|
| `onCreated` | After instance creation | Initialize internal state, set up non-reactive data |
| `onBound` | After all bindings applied | Perform post-binding setup, validate property combinations |
| `onMounted` | After insertion into visual tree | Start animations, begin data fetching, register for platform events |
| `onUpdated` | After each re-render | React to property or state changes, perform side effects |
| `onUnmounted` | Before removal from visual tree | Stop animations, clean up platform resources |
| `onDestroyed` | After resource cleanup | Final cleanup, logging, analytics |

### 9.3 Update Triggers

A component is queued for re-render when:

- A bound state value changes
- A theme token it depends on changes
- Its parent re-renders and passes new properties
- An action callback modifies its internal state
- The component's screen receives a forced update signal

### 9.4 Update Batching

Updates are batched to avoid redundant re-renders. The batching window is one frame (approximately 16ms at 60fps). During a frame:

1. All update triggers are collected.
2. Duplicate triggers for the same component are collapsed.
3. Affected components are re-rendered in tree order.
4. Changed visual output is committed to the platform.

---

## 10. Screen Lifecycle

### 10.1 Lifecycle Stages

Screens have their own lifecycle, which governs screen-level initialization, rendering, and cleanup.

```
┌────────────┐
│   Loaded   │  Screen definition resolved and validated
└─────┬──────┘
      │
      ▼
┌────────────┐
│  Rendered  │  Screen layout computed, components mounted
└─────┬──────┘
      │
      ▼
┌────────────┐
│  Appeared  │  Screen visible and interactive to the user
└─────┬──────┘
      │
      ▼
┌────────────┐
│Interacting │  User interacting with screen content
└─────┬──────┘
      │
      ▼
┌────────────┐
│Backgrounded│  Screen no longer visible (covered by another screen)
└─────┬──────┘
      │
      ▼
┌────────────┐
│  Resumed   │  Screen becomes visible again (returned from background)
└─────┬──────┘
      │
      ▼
┌────────────┐
│Disappeared │  Screen removed from navigation stack
└─────┬──────┘
      │
      ▼
┌────────────┐
│  Destroyed │  Screen resources released, components unmounted
└────────────┘
```

### 10.2 Screen Lifecycle Hooks

| Hook | Timing | Purpose |
|------|--------|---------|
| `onLoad` | Screen definition loaded | Initialize screen-level state, prefetch data |
| `onRender` | Layout computed and components mounting | Prepare entrance animations |
| `onAppear` | Screen visible to user | Start screen-level timers, analytics tracking |
| `onBackground` | Screen covered by another screen | Pause animations, release non-visible resources |
| `onResume` | Screen becomes visible again | Refresh data, resume animations |
| `onDisappear` | Screen removed from navigation stack | Clean up screen-level subscriptions |
| `onDestroy` | Screen fully destroyed | Final cleanup, release all resources |

### 10.3 Screen Caching

Screens that have been rendered but are not currently visible may be cached to preserve their state and avoid re-render on return. Caching strategy is configurable:

| Strategy | Behavior | Use Case |
|----------|----------|----------|
| `none` | Screen destroyed on disappear | One-time screens, wizards |
| `state-only` | Screen state preserved but components unmounted | Screens with heavy rendering cost |
| `full` | Screen and components preserved in memory | Frequently revisited screens, tab screens |

---

## 11. Responsive Adaptation

### 11.1 Adaptation Dimensions

The Rendering Engine adapts rendered output across four dimensions:

| Dimension | Triggers | Adaptation Strategy |
|-----------|----------|-------------------|
| Viewport size | Width/height breakpoints | Variant selection, layout reflow, component substitution |
| Pixel density | DPR value | Asset density selection, resolution-independent units |
| Orientation | Portrait/landscape | Layout reflow, variant selection |
| Input modality | Touch/mouse/keyboard | Interaction pattern adaptation, focus management |

### 11.2 Breakpoint System

Breakpoints are defined in the screen definition and matched against the current viewport:

```
Breakpoint Definition:
{
  "responsive": {
    "breakpoints": [
      { "name": "compact", "maxWidth": 375 },
      { "name": "medium",  "minWidth": 376, "maxWidth": 768 },
      { "name": "expanded", "minWidth": 769, "maxWidth": 1024 },
      { "name": "large",   "minWidth": 1025 }
    ],
    "variants": {
      "compact": { "layout": "compact-layout", "component": "compact-card" },
      "medium":  { "layout": "default-layout" },
      "expanded": { "layout": "expanded-layout", "component": "detailed-card" },
      "large":   { "layout": "expanded-layout", "component": "detailed-card", "showSidebar": true }
    }
  }
}
```

### 11.3 Variant Selection

At render time, the current viewport dimensions are evaluated against the breakpoint rules. The matching breakpoint determines:

1. **Layout variant** — Different layout trees may be selected for different breakpoints.
2. **Component variant** — Alternative component identifiers may be specified for different breakpoints (e.g., compact card vs. detailed card).
3. **Property overrides** — Component properties may be overridden per breakpoint.
4. **Visibility rules** — Certain components may be shown or hidden at specific breakpoints.

### 11.4 Layout Reflow

When viewport dimensions change (orientation change, window resize):

1. The breakpoint evaluator determines if the active breakpoint has changed.
2. If the breakpoint changed, the variant selection process re-runs.
3. The Layout Engine recomputes positions for the new dimensions.
4. Components are re-rendered with any variant-specific properties.
5. Transitions are animated when component identity is preserved.

---

## 12. Incremental Rendering

### 12.1 Rendering Strategies

The Rendering Engine supports multiple rendering strategies for performance optimization:

| Strategy | Mechanism | Use Case |
|----------|-----------|----------|
| Full render | Render all components in a single pass | Small screens, critical screens |
| Virtualized | Render only visible components in scrollable containers | Long lists, grids |
| Deferred | Render off-screen components after visible components | Heavy screens below the fold |
| Progressive | Render high-priority components first, lower-priority later | Screen entrance experience |
| Skeleton | Render placeholder skeleton UI while data loads | Data-dependent screens |

### 12.2 Virtualization

Virtualization optimizes rendering of scrollable content by only rendering components within the visible viewport. The virtualization system:

1. Measures each item's estimated or actual size.
2. Computes the total scrollable content height from the measured sizes.
3. Determines which items fall within the current viewport + overscan area.
4. Renders only the visible items.
5. Recycles component instances as items scroll out of view.
6. Updates the scroll position and rendered set on each scroll event.

Virtualization properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `estimatedItemSize` | dimension | auto | Estimated size of each item for scroll height calculation |
| `overscanCount` | number | 3 | Number of additional items to render beyond visible bounds |
| `recycleComponents` | boolean | true | Whether to recycle component instances during scrolling |
| `stickyHeaders` | boolean | false | Whether section headers remain visible during scroll |

### 12.3 Deferred Rendering

Components below the initial viewport are deferred — they are not rendered until the user scrolls near them. Deferred rendering:

1. Identifies components outside the initial viewport during layout.
2. Marks deferred components with their bounds and priority.
3. Renders visible components first.
4. Monitors scroll position and viewport changes.
5. Renders deferred components when they approach the viewport (within a configurable threshold).

### 12.4 Priority-Based Rendering

Components are assigned render priorities that determine their position in the rendering queue:

| Priority | Components | Timing |
|----------|------------|--------|
| `critical` | Navigation bars, headers, loading indicators | Immediate — before frame commit |
| `high` | Primary content, actionable components | Within the first frame |
| `normal` | Secondary content, supporting information | Within 2-3 frames |
| `low` | Below-fold content, decorative elements | After first paint |
| `background` | Analytics pixels, invisible tracking | When idle |

---

## 13. Platform Adaptation Layer

### 13.1 Architecture

The Platform Adaptation Layer abstracts platform-specific rendering behind a unified interface. The Rendering Engine operates against this interface, never against platform-specific APIs directly.

```
┌──────────────────────────────────────────────────┐
│                 Rendering Engine                   │
│  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │
│  │  Screen  │  │  Layout  │  │   Component    │  │
│  │ Resolver │  │  Engine  │  │   Renderer     │  │
│  └──────────┘  └──────────┘  └───────┬────────┘  │
│                                       │            │
└───────────────────────────────────────┼────────────┘
                                        │
       ┌────────────────────────────────┼────────────────────┐
       │           Platform Adaptation Layer                │
       │  ┌──────────┐  ┌──────────┐  ┌────────────────┐   │
       │  │  Layout  │  │  View    │  │  Event Input   │   │
       │  │  Adapter │  │  Factory │  │  Handler       │   │
       │  └──────────┘  └──────────┘  └────────────────┘   │
       └──────────────────────┬─────────────────────────────┘
                              │
       ┌──────────────────────┼─────────────────────┐
       │                      │                      │
       ▼                      ▼                      ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Native iOS  │    │   React      │    │    Web       │
│  UIKit/SwiftUI│    │  Native     │    │    DOM       │
└──────────────┘    └──────────────┘    └──────────────┘
```

### 13.2 Adapter Responsibilities

| Adapter | Responsibility |
|---------|---------------|
| Layout Adapter | Map abstract layout primitives (row, column, stack, scroll) to platform-specific layout systems (flexbox, auto layout, grid) |
| View Factory | Create, configure, and recycle platform-specific view instances for each component type |
| Event Input Handler | Map platform-specific input events (touch, click, keyboard, focus) to the Rendering Engine's unified event model |
| Accessibility Adapter | Map accessibility properties and roles to platform-specific accessibility APIs |
| Animation Driver | Execute declarative animation definitions using platform-specific animation engines |

### 13.3 Platform Contracts

Each platform must implement the Platform Adapter interface:

```
interface PlatformAdapter {
  // Layout
  createLayoutNode(type: LayoutType, props: LayoutProps): PlatformNode
  measureNode(node: PlatformNode, constraints: SizeConstraint): Size
  layoutNode(node: PlatformNode, rect: Rect): void
  
  // Views
  createView(componentType: string, props: ComponentProps): PlatformView
  updateView(view: PlatformView, props: ComponentProps): void
  removeView(view: PlatformView): void
  
  // Hierarchy
  insertChild(parent: PlatformNode, child: PlatformNode, index: number): void
  removeChild(parent: PlatformNode, child: PlatformNode): void
  
  // Events
  registerEventHandler(view: PlatformView, event: string, handler: Function): void
  unregisterEventHandler(view: PlatformView, event: string): void
  
  // Scroll
  createScrollContainer(props: ScrollProps): PlatformScrollContainer
  scrollTo(container: PlatformScrollContainer, offset: Point, animated: boolean): void
  
  // Accessibility
  setAccessibilityProps(view: PlatformView, props: AccessibilityProps): void
  
  // Animation
  animate(node: PlatformNode, animation: AnimationDefinition): AnimationHandle
  cancelAnimation(handle: AnimationHandle): void
  
  // Lifecycle
  mount(root: PlatformNode): void
  unmount(root: PlatformNode): void
}
```

---

## 14. Performance Model

### 14.1 Render Budget

The Rendering Engine operates within a per-frame render budget. The target is 60 frames per second (approximately 16ms per frame). The render budget is allocated as:

| Phase | Budget (16ms target) | Description |
|-------|---------------------|-------------|
| Layout computation | 4ms | Measure and layout passes |
| Component resolution | 2ms | Registry lookups, schema validation |
| Data binding resolution | 2ms | Source lookups, transform application |
| Component update | 4ms | applyProps, onUpdated hooks |
| Platform render commit | 4ms | Delegate to platform adapter |

### 14.2 Performance Measurement

The Rendering Engine collects performance metrics at each pipeline stage:

| Metric | Measured At | Unit |
|--------|-------------|------|
| screen-load-time | Screen load stage | ms |
| layout-compute-time | Layout compute stage | ms |
| component-resolve-time | Component resolution stage | ms |
| bind-time | Data binding stage | ms |
| mount-time | Component mount stage | ms |
| frame-time | Per-frame total | ms |
| render-count | Components rendered per frame | count |
| re-render-count | Components re-rendered per frame | count |
| layout-cache-hit-rate | Layout computation cache | percentage |

### 14.3 Optimization Strategies

The Rendering Engine employs several optimization strategies:

**Layout caching** — Computed layout results are cached by screen and breakpoint. When a screen is revisited at the same breakpoint, the cached layout is reused.

**Component memoization** — Components with unchanged inputs skip re-render. The memoization key is computed from the component's bound properties, state dependencies, and theme dependencies.

**Virtualized rendering** — Scrollable containers render only visible content, as described in section 12.2.

**Deferred binding** — Data binding resolution is deferred for components below the viewport fold. Bindings are resolved when the component approaches the visible area.

**Batch updates** — State changes within a single frame are batched into a single re-render pass.

**Lazy component resolution** — Component implementations are loaded lazily. Only the components needed for the current screen are resolved and loaded.

**Tree diffing** — On re-render, the Rendering Engine diffs the previous and new component trees to minimize platform view mutations.

---

## 15. Error Handling

### 15.1 Error Boundary Hierarchy

Error boundaries catch rendering failures at multiple levels:

| Boundary Level | Catches | Fallback Behavior |
|----------------|---------|-------------------|
| Component | Single component failure | Replace with placeholder component |
| Container | Container and children failure | Show container-level error state |
| Screen | Entire screen failure | Show screen-level error screen |
| Runtime | Runtime-wide rendering failure | Show safe-mode diagnostic screen |

### 15.2 Error Types and Responses

| Error Type | Cause | Response |
|------------|-------|----------|
| Component resolution failure | Unregistered component identifier | Placeholder component with component name |
| Property validation failure | Invalid property type or value | Apply default value, log warning |
| Binding resolution failure | Missing state path or data source | Apply fallback value, log error |
| Layout constraint failure | Unsolvable layout constraints | Relax constraints, re-compute, log warning |
| Component instantiation failure | Component constructor throws | Error boundary catches, fallback rendered |
| Platform rendering failure | Platform view creation fails | Platform error boundary, graceful degradation |
| Timeout | Rendering exceeds budget | Deferred rendering, progressive enhancement |

### 15.3 Graceful Degradation

When the Rendering Engine encounters resource pressure (low memory, constrained CPU):

1. **Reduce overscan** — Virtualized lists reduce their overscan count.
2. **Disable animations** — All animations are suspended.
3. **Degrade image quality** — Images are loaded at lower resolution.
4. **Suspend deferred rendering** — Components below the fold are not rendered.
5. **Clear layout cache** — Cache is cleared to free memory.
6. **Force component unmount** — Non-visible screens are fully destroyed.

---

## 16. Security Model

### 16.1 Rendering Security

The Rendering Engine enforces security at every stage:

- **Component allow-list** — Only components registered in the Component Registry can be rendered. Ad-hoc rendering is not possible.
- **Property sanitization** — All component properties are validated against the component's property schema. Unexpected properties are rejected.
- **Binding path restriction** — State access is restricted to paths declared in the screen's data binding definitions. Arbitrary state traversal is blocked.
- **Action binding validation** — Action references are validated against the Action Dispatcher's registered action types. Arbitrary action execution is blocked.
- **Layout depth limit** — Layout trees are limited to a maximum depth to prevent stack overflow attacks.
- **Component count limit** — Screens have a maximum component count to prevent resource exhaustion.

### 16.2 Isolation

The Rendering Engine isolates components and screens from each other:

- Component instances cannot access other components' internal state.
- Component rendering failures do not affect sibling or parent components.
- Component lifecycle hooks execute in a sandboxed context.
- Theme token resolution is read-only — components cannot modify theme tokens.
- Data binding sources are read-only — components cannot write to state through bindings.

---

## 17. Observability

### 17.1 Rendering Events

The Rendering Engine publishes structured events for observability:

| Event | Payload | Emitted When |
|-------|---------|-------------|
| `screen.load.start` | screenId, params | Screen load begins |
| `screen.load.complete` | screenId, duration | Screen load completes |
| `screen.load.error` | screenId, error | Screen load fails |
| `screen.render` | screenId, componentCount, renderTime | Screen render completes |
| `component.resolve` | componentId, screenId, duration | Component resolved |
| `component.mount` | componentId, instanceId | Component mounted |
| `component.unmount` | componentId, instanceId | Component unmounted |
| `component.error` | componentId, instanceId, error | Component error caught |
| `binding.resolve` | target, source, path, duration | Data binding resolved |
| `layout.compute` | screenId, nodeCount, duration | Layout computation complete |
| `frame.drop` | frameNumber, duration | Frame exceeds render budget |

### 17.2 Diagnostics

The Rendering Engine exposes diagnostic capabilities:

- **Render tree inspector** — View the current component tree with properties, bindings, and state.
- **Layout overlay** — Visual overlay showing component bounds, margins, padding, and flex properties.
- **Performance overlay** — Real-time frame timing, render counts, and budget utilization.
- **Binding inspector** — View all active bindings with their resolved values and sources.
- **Component explorer** — Browse the Component Registry and inspect component schemas and implementations.

---

## 18. Anti-Patterns

| Anti-Pattern | Description | Resolution |
|-------------|-------------|------------|
| Deep layout trees | Component trees with excessive nesting depth | Flat layout structure, limit to 10-15 levels of nesting |
| Massive single screen | All content rendered on one screen with no virtualization | Virtualize scrollable content, split into multiple screens |
| Expensive render-time computation | Complex data transformations in bindings | Pre-compute data on state update, use computed bindings sparingly |
| Unnecessary re-renders | Components re-rendering when inputs have not changed | Memoize components, scope bindings to only needed state paths |
| Synchronous data fetching | Blocking render on data loading | Use skeleton states, deferred rendering, async data patterns |
| Platform-specific logic in definitions | Screen definitions referencing platform-specific APIs | Abstract behind Platform Adapter, use responsive variants |
| Direct state mutation | Components modifying state through bindings | All state mutations go through Action Dispatcher |
| Missing error boundaries | Uncaught rendering errors propagating to parent screens | Error boundaries at every container and screen level |

---

## 19. Relationship to Other Subsystems

| Subsystem | Relationship |
|-----------|-------------|
| Component Registry (KB-056) | Provides component implementations and schemas. Rendering Engine is the primary consumer. |
| State Manager (KB-054) | Provides state values for data binding. Receives component state change notifications. |
| Theme Engine (KB-017/KB-049) | Provides resolved theme tokens. Receives theme binding resolution requests. |
| Action Dispatcher (KB-057) | Receives action execution requests from component event handlers. Returns execution results. |
| Navigation Engine (KB-055) | Requests screen rendering. Provides navigation parameters and context. |
| Event Bus (KB-019) | Receives rendering events for cross-subsystem communication. Publishes component lifecycle events. |
| Manifest Resolver (KB-009) | Provides screen definitions and component references. |
| Package Resolver (KB-051) | Registers component implementations from installed packages. |
| Cache Manager (KB-051) | Caches screen definitions, resolved layouts, and computed bindings. |
| Permission Engine (KB-051) | Evaluates screen-level and component-level permission rules. |
| Telemetry (KB-051) | Collects rendering performance metrics and events. |
| Diagnostics (KB-051) | Provides render tree inspection and performance overlays. |
| Security Manager (KB-051) | Validates component and property allow-lists. Enforces rendering security policies. |

---

## 20. Open Questions

1. Should the Rendering Engine support hot reload for development mode (live component replacement without screen reload)?
2. What is the maximum supported layout tree depth before performance degradation becomes unacceptable?
3. Should the Rendering Engine support custom layout algorithms defined by capabilities?
4. What is the caching strategy for screen variants across different breakpoints?
5. Should component transitions be defined in the screen definition or handled entirely by the platform?

---

## References

| Reference | Description |
|-----------|-------------|
| KB-051 | Runtime Architecture Overview — foundational Runtime architecture, subsystem definitions, lifecycle |
| KB-046 | Component Tree Model — structural model for component hierarchies |
| KB-045 | Screen Model — declarative screen definition structure |
| KB-049 | Theme & Design Token Model — theme token system and resolution |
| KB-047 | Action & Event Model — action and event definition patterns |
| KB-044 | Navigation Architecture — navigation structures and routing |
| KB-012 | Component Registry — component registration and resolution |
| KB-008 | Runtime Overview — high-level Runtime introduction |
| KB-009 | Manifest Specification — Manifest document structure and resolution |
| KB-042 | Application Manifest Specification — application-level Manifest definition |
