// growth-tweaks.jsx — mounts only the Tweaks panel and drives the static page
// via attributes / CSS vars on <html>. All hero variants live in the DOM; CSS
// shows the active one based on [data-hero] / [data-headline].

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "a",
  "accent": "#d99423"
}/*EDITMODE-END*/;

function GrowthTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const root = document.documentElement;

  React.useEffect(() => { root.setAttribute('data-headline', t.headline); }, [t.headline]);
  React.useEffect(() => {
    root.style.setProperty('--amber', t.accent);
    // keep the brighter "strip" accent in step with the chosen hue
    root.style.setProperty('--strip', t.accent);
  }, [t.accent]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Headline" />
      <TweakRadio
        label="Version"
        value={t.headline}
        options={[
          { value: 'a', label: 'Leaking $' },
          { value: 'b', label: 'On table' },
        ]}
        onChange={(v) => setTweak('headline', v)}
      />
      <TweakSection label="Accent" />
      <TweakColor
        label="Color"
        value={t.accent}
        options={['#d99423', '#e8a635', '#e07a3f', '#c9a227']}
        onChange={(v) => setTweak('accent', v)}
      />
    </TweaksPanel>
  );
}

(function mount(){
  var el = document.createElement('div');
  el.id = 'tweaks-root';
  document.body.appendChild(el);
  ReactDOM.createRoot(el).render(<GrowthTweaks />);
})();
