# Craft Lab

## Use a component

In an existing React app with JSX, CSS, and SVG import support, install the icon dependency used by this collection:

```sh
npm install lucide-react@^0.468.0
```

Copy the files for your component from this repository into `src/components/craft/` in your app. Keep their relative paths so the stylesheet and asset imports resolve.

| Component | Files to copy |
| --- | --- |
| Expandable Glass Tab Bar | [GlassTabBar.jsx](src/GlassTabBar.jsx) and [glass-tab-bar.css](src/glass-tab-bar.css) |
| Git Provider Integration | [GitProviders.jsx](src/GitProviders.jsx), [git-providers.css](src/git-providers.css), and the [providers/](src/providers/) folder |
| Precision Dial, Magnetic Dock, Stacked Toasts, Elastic Slider, Hold to Confirm, Segmented Control | [Studies.jsx](src/Studies.jsx) and [studies.css](src/studies.css) |

### Render the glass tab bar

From `src/App.jsx`, import the default export. The component loads its own CSS.

```jsx
import GlassTabBar from "./components/craft/GlassTabBar";

export default function App() {
  return <GlassTabBar />;
}
```

### Connect a control to your app

The controls in `Studies.jsx` are named exports. This example uses the dial's `onChange` callback to update a brightness filter.

```jsx
import { useState } from "react";
import { PrecisionDial } from "./components/craft/Studies";

export default function BrightnessControl() {
  const [brightness, setBrightness] = useState(80);

  return (
    <section>
      <p style={{ filter: `brightness(${brightness}%)`, background: "#e6c463", padding: 16 }}>
        Brightness preview
      </p>
      <PrecisionDial initialValue={80} onChange={setBrightness} />
    </section>
  );
}
```

## Run the demo gallery

From the root of a local clone:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Run `npm run build` to generate `dist/`, then `npm run preview` to serve that build locally.
