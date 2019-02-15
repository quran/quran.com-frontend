# Events

To better serve users, we need to understand their behaviours. Luckily, we do have ways to collect event data. 

### `react-metrics`
We use `react-metrics` to capture and send event data to Google Analytics and Mixpanel. See `/src/metrics.ts` which is the metrics config that wraps `App.tsx`. 

### Registering an event
Currently, we have factories to create events. See `/src/events.ts`. Lastly, these events can be used:

```jsx
<StyledLink
  target="_blank"
  rel="noopener noreferrer"
  href="http://legacy.quran.com/"
  {...FOOTER_EVENTS.CLICK.LEGACY_LINK.PROPS}
>
  <T id={KEYS.NAV_LEGACY_SITE} />
</StyledLink>
```

This will add these props to the component:
```js
'data-metrics-event-label': LABEL,
'data-metrics-event-action': ACTION,
'data-metrics-event-name': NAME,
```
