# Craft Lab

Six interactive studies built with React, CSS, and Tailwind CSS.

## Run the collection

```sh
npm install
npm run dev
```

Use `npm run build` to create the static site in `dist`.

## Use a component in your portfolio

Copy `src/Studies.jsx` and `src/studies.css` into the same folder in your React project. The components import their stylesheet and use icons from `lucide-react`. The demo uses Tailwind’s base reset.

```jsx
import { PrecisionDial } from "./Studies";

export default function InteractionStudy() {
  return (
    <PrecisionDial initialValue={64} onChange={(value) => console.log(value)} />
  );
}
```

| Component        | Interaction                                        | Props                             |
| ---------------- | -------------------------------------------------- | --------------------------------- |
| PrecisionDial    | Drag vertically or horizontally, or use arrow keys | `initialValue`, `onChange(value)` |
| MagneticDock     | Magnify adjacent icons and select a tool           | `onSelect(name)`                  |
| StackedToasts    | Add and dismiss demo notifications                 | Self-contained demo               |
| ElasticSlider    | Adjust a value with a waveform readout             | `initialValue`, `onChange(value)` |
| HoldToConfirm    | Hold for 850 ms with a pointer, Space, or Enter    | `onConfirm()`                     |
| SegmentedControl | Switch between three view modes                    | `onChange(name)`                  |

## Design references

The drag control retains pointer capture as described in [Rauno Freiberg’s interaction study](https://rauno.me/craft/interaction-design). The toast stack uses interruptible CSS transitions inspired by [Emil Kowalski’s Sonner write-up](https://emilkowal.ski/ui/building-a-toast-component). The visual treatments and implementations were created for this collection.
