import GlassTabBar from './GlassTabBar';
import GitProviders from './GitProviders';
import {
  PrecisionDial,
  MagneticDock,
  StackedToasts,
  ElasticSlider,
  HoldToConfirm,
  SegmentedControl,
} from "./Studies";

export const studies = [
  {
    title: "Expandable Glass Tab Bar",
    slug: "expandable-glass-tab-bar",
    date: "2026-11-19",
    group: "Navigation",
    color: "sage",
    desc: "A glass tab bar that expands into a grid of quick actions.",
    hint: "Expand the tab bar",
    Component: GlassTabBar,
    notes: "Switch tabs, then tap + to reveal eleven quick actions. Inspired by Jorge Castillo's expandable tab bar.",
  },
  {
    title: "Git Provider Integration",
    slug: "git-provider-integration",
    date: "2026-11-18",
    group: "Inputs",
    color: "sage",
    desc: "Connect one Git provider to a workspace.",
    hint: "Select a provider",
    Component: GitProviders,
    notes: "Explore the providers and switch the active connection. This interactive demo is inspired by Vasile (@justvasi).",
  },
  {
    title: "Precision Dial",
    slug: "precision-dial",
    date: "2026-02-05",
    group: "Inputs",
    color: "butter",
    desc: "An analog control for fine adjustments.",
    hint: "Drag to rotate",
    Component: PrecisionDial,
    notes:
      "Drag up or right to increase intensity. Focus the dial and use arrow keys for one-percent adjustments, or Page Up and Page Down for larger steps.",
  },
  {
    title: "Magnetic Dock",
    slug: "magnetic-dock",
    date: "2026-06-11",
    group: "Navigation",
    color: "sage",
    desc: "A floating toolbar that follows your focus.",
    hint: "Hover to magnify",
    Component: MagneticDock,
    notes:
      "Move the pointer across the tools, or Tab between them. Nearby icons lift with the active tool. Select a tool to pin its active indicator.",
  },
  {
    title: "Stacked Toasts",
    slug: "stacked-toasts",
    date: "2026-08-25",
    group: "Feedback",
    color: "lilac",
    desc: "Layered notifications with a soft landing.",
    hint: "Click to stack",
    Component: StackedToasts,
    notes:
      "Add several notifications in quick succession. Each new message moves to the front while the two previous messages settle behind it. Dismiss the front message to reveal the next.",
  },
  {
    title: "Elastic Slider",
    slug: "elastic-slider",
    date: "2025-01-21",
    group: "Inputs",
    color: "sky",
    desc: "A volume slider with a responsive waveform.",
    hint: "Drag to adjust",
    Component: ElasticSlider,
    notes:
      "Drag through the waveform to set the volume. Use the arrow keys for fine adjustments. The filled bars and numeric readout track the same value.",
  },
  {
    title: "Hold to Confirm",
    slug: "hold-to-confirm",
    date: "2025-04-17",
    group: "Feedback",
    color: "rose",
    desc: "A deliberate press for important actions.",
    hint: "Press and hold",
    Component: HoldToConfirm,
    notes:
      "Hold the button for 850 milliseconds to confirm, or release early to cancel. The same gesture works with Space or Enter.",
  },
  {
    title: "Segmented Control",
    slug: "segmented-control",
    date: "2025-09-13",
    group: "Navigation",
    color: "sand",
    desc: "A sliding selector for switching views.",
    hint: "Click to switch",
    Component: SegmentedControl,
    notes:
      "Choose a view to move the selection indicator. Each choice exposes its pressed state to assistive technology and can be activated from the keyboard.",
  },
];
