# Website mockup

[mockup-kombi.html](mockup-kombi.html) is the agreed layout of the public forecast page, as one self-contained HTML file. Open it in a browser and switch states in the footer or by URL hash:

- `#normal`: the real prod forecast of 16.10.2026 (19 cm, rising to about 31 cm overnight)
- `#flood`: a made-up flood like the record of 19.11.2024: 128 cm now, 172 cm peak, 90 % range up to 197 cm
- `#stale`: the flood seen two hours later with no new data
- `#fallback`: the flood, but only the persistence model answered

Top to bottom:

1. **Title and verdict.** "Deilbach Pegel Vorhersage", then the expected category with its time and, when the 90 % range reaches a higher one, "Möglich: …" with a dashed chip. Then the level now and the distance to 145 cm.
2. **Chart.** The last 24 h measured and the 24 h forecast over the five coloured category zones; darker shading is the 80 % range, lighter the 90 % range. The y-axis always runs from 0 to 250 cm, so a level is always seen against the categories; it grows only if a level goes higher.
3. **House.** The bank, the wall, the house and the gauge staff, on the same scale as the chart. The water shows the current level with a slow wave. Hovering or dragging on the chart (or the arrow keys) moves the water to the level at that hour; it eases back afterwards. Stale data turns the water grey and still.
4. **Zeitplan.** One card per threshold with the expected and earliest possible time and the actions; hidden when nothing is expected.

The earlier rounds (three text-heavy mockups, then four simpler ones) are in this PR's history.

## Rules

- **Times** are hours, taken from the last forecast point before a line crosses a threshold, so they err early.
- **Stale or fallback means no forecast.** No verdict, no forecast in the chart or the house, a badge with the time of the newest reading and a link to the Hochwasserportal NRW. Freshness is rechecked every minute.
- **Categories** start strictly above their threshold (145,0 cm is still Kat. 1), as in `core/categories.py`.
- **Styling** follows energiekonzepte-ruhr.de; the mockup hotlinks the client's logo, the real page will copy it.

## Open before building

- **Action thresholds.** The category table in the repo's `README.md` pairs actions with the wrong levels ("Kat. 2: Ab 165 cm Rückstauventil schließen"). The client should confirm whether the barriers go up at 165 or 185 cm. The actions also need to move into `config/pegel.json`, next to the categories.
- **False alarms.** Before "Möglich: …" ships, count how often the 90 % top would have warned for nothing on the evaluation data (`false_alarms.csv`); switch to the 80 % range if it cries wolf.
- **Touch on real phones** is untested; the drag only starts on a sideways move, so vertical scrolling keeps working.
