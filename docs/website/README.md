# Website mockups

Four mockups of the public forecast page, each one self-contained HTML file. Open them in a browser and switch states in the footer or by URL hash:

- `#normal`: the real prod forecast of 16.10.2026 (19 cm, rising to about 31 cm overnight)
- `#flood`: a made-up flood like the record of 19.11.2024: 128 cm now, 172 cm peak, 90 % range up to 197 cm
- `#stale`: the flood seen two hours later with no new data
- `#fallback`: the flood, but only the persistence model answered

| Mockup | First screen on a phone |
|---|---|
| [1 · Kurve](mockup-1-kurve.html) | The chart with the coloured category zones is the page; highest level in 3, 12 and 24 h above it |
| [2 · Kacheln](mockup-2-kacheln.html) | The level now in a photo band, then three tiles filled with the category colour |
| [3 · Pegellatte](mockup-3-pegellatte.html) | A picture of the bank, wall and gauge staff, with waterlines for 3, 12 and 24 h |
| [4 · Wasser](mockup-4-wasser.html) | The zone chart on a dark band, the water under the line gently moving |

Styling follows energiekonzepte-ruhr.de: light header with logo tile and wordmark, Space Grotesk and Manrope, the Zollverein photo with its warm tint, orange pill buttons, uppercase centred headings. The mockups hotlink the client's logo and hero photo; the real page will copy them.

## Rules all four follow

- **Almost no text.** At most 12 words on the first phone screen; colour, numbers and position carry the meaning. Category names appear only in the status chip and in "Was tun?".
- **Highest level per window.** Each 3/12/24 h value is the highest level up to then, not the level at that hour; otherwise a peak at +7 h would vanish between the 3 h and 12 h values.
- **The forecast line sets the category.** A dashed outline around a higher number means the 90 % range reaches it. The darker band is the 80 % range, the lighter one the 90 % range.
- **Stale or fallback means no forecast.** Zones turn grey, the old forecast disappears, a badge gives the time of the newest reading and a link goes to the Hochwasserportal NRW. Freshness is rechecked every minute.
- **Times** are hours, taken from the last forecast point before a line crosses a threshold, so they err early.
- **The Wasser animation** moves only the water, never the measured line; it stops when the data is stale, pauses in hidden tabs and respects reduced motion.

## Open before building

- **Action thresholds.** The category table in the repo's `README.md` pairs actions with the wrong levels ("Kat. 2: Ab 165 cm Rückstauventil schließen"). The client should confirm whether the barriers go up at 165 or 185 cm. The actions also need to move into `config/pegel.json`, next to the categories.
- **12 h.** `forecast.summary_horizons_hours` is `[3, 24]`; add 12, or let the page compute it from the points.
- **False alarms.** Before the dashed "possible" category ships, count how often the 90 % top would have warned for nothing on the evaluation data (`false_alarms.csv`).
- **The `situation` tag** says `strong` for a rise from 19 to 31 cm; the mockups don't use it.
