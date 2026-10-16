# Website mockups

Three mockups of the public forecast page, each one self-contained HTML file. Open them in a browser; the strip at the top switches between four states, also reachable by URL hash:

- `#normal`: the real prod forecast of 16.10.2026, 11:30 Uhr (19 cm, rising to about 31 cm overnight)
- `#flood`: a made-up flood shaped like the record of 19.11.2024: 128 cm now, 172 cm at the peak, 90 % range up to 197 cm
- `#stale`: the flood forecast seen two hours later, with no new data
- `#fallback`: the flood, but only the persistence model answered (no bands)

The pages embed the sample responses and compute everything from them, the way the React component will. Styling follows energiekonzepte-ruhr.de: Space Grotesk and Manrope, the petrol brand colour, the warm off-white background. The orange accent is used only in the logo, so it can't be mistaken for a warning.

| Mockup | What the visitor sees first | Strong at | Weak at |
|---|---|---|---|
| [A · Lagebild](mockup-a-lagebild.html) | A verdict box: "Erwartet: Kat. 3 heute gegen 22 Uhr · Möglich: Kat. 4 ab etwa 22 Uhr", then the level now with the distance to 145 cm | The clearest answer for someone in a hurry; the best stale state | In a flood, the 3/12/24 h ranges sit just below the fold on a phone |
| [B · Zeitstrahl](mockup-b-zeitstrahl.html) | One sentence about time, then a strip of 24 hourly cells coloured by category and four tiles: now, 3, 12, 24 h | Answers now/3/12/24 h with numbers on the first phone screen; shows when it starts and ends | More to read; the strip needs its legend |
| [C · Pegellatte](mockup-c-pegellatte.html) | The verdict, the level now and "noch 17 cm bis kritisch", then a gauge staff with the highest level in 3/12/24 h on a fixed 0–250 cm scale | Works for people who don't read charts; shows the distance to the wall | Takes the most room; the staff squeezes low water into a thin strip |

## How they were made

Three designer agents each argued for a different first thing to show. Two adversarial critics reviewed all three:

- **Residents and usability:** screenshots at 375 px and on desktop, in light and dark, and a five-second test as a resident at 2 a.m.
- **Data honesty and hydrology:** recomputed every number and tested the edge cases.

The designers then fixed every finding against a shared list of 13 rules. The critics ranked the first round A, B, C.

## Recommendation

Build **A's verdict on top of B's first screen**:

1. **Verdict first.** At night in the rain the question is "do I have to do something?", not "what does the chart say?". One sentence with the expected category and, at the same weight, the highest *possible* category with its earliest time.
2. **Then the level now**, with category, trend and "noch X cm bis kritisch".
3. **Then four tiles: now, 3, 12, 24 h.** Each shows the *highest* level up to then and *when* it happens, in large type. The level at the end of the window goes in small type. The level at +12 h alone would hide a peak at +7 h (flood: 131 cm at +12 h, 172 cm at +7 h).
4. **Below the fold:** the actions with expected and earliest time, the chart with the 80 and 90 % ranges over the category zones, the category table, explanations and the disclaimer.

C's gauge staff is the friendliest picture, but it repeats what the tiles already say and costs a screen on a phone. It could replace the chart later if testing with residents shows they don't read charts.

## Decisions all three already follow

- **The forecast line sets the category and colour.** Whenever the top of the 90 % range reaches a higher category within 24 h, the headline says so with the earliest time. A missed warning costs more than a false alarm.
- **Ranges:** "erwartet höchstens X cm · möglich bis etwa Y cm"; per hour, 80 % = "wahrscheinlich (8 von 10)" and 90 % = "möglich (9 von 10)". Never "nicht über": a window's range built from hourly bands isn't a strict 90 % range for its maximum, and the bands were fitted mostly at normal water levels (on rises into a flood, 14 % of readings landed above the 95 % band; see `analysis/model-evaluation/learnings.md`).
- **Stale or fallback means no verdict.** Above 90 min, or when only persistence answered: no verdict and no green. The page shows the last level with its time and trend, and links the Hochwasserportal NRW. Freshness is rechecked every minute and when the tab comes back.
- **Time:** forecast times only to the hour, always with the day after midnight; whole cm in large numbers.
- **Categories** start strictly above the threshold (145,0 cm is still Kat. 1), as in `core/categories.py`.

## Open before building

- **Action thresholds.** The category table in the repo's `README.md` pairs one threshold with an action at another one ("Kat. 2: Ab 165 cm Rückstauventil schließen"). The mockups list one action per trigger level. The client should confirm whether the barriers go up at 165 or 185 cm.
- **12 h.** `forecast.summary_horizons_hours` is `[3, 24]`; add 12, or let the page compute it from the points.
- **"Möglich ab".** B takes the hour before the 90 % top crosses a threshold (21 Uhr), A and C the hour after it (22 Uhr). For a warning page the earlier hour is the safer choice.
- **The `situation` tag** says `strong` for a rise from 19 to 31 cm. The mockups show the computed rise instead; the tag may need a rethink before it appears on the page. Its description in `api/schemas.py` ("picked the bands") is outdated.
- **False alarms.** Before the 90 % top goes into the headline for good, count how often it would have warned for nothing on the evaluation data (`false_alarms.csv`).
- **Categories and actions in config.** The mockups hard-code both. Categories already come from `config/pegel.json`; the actions with their trigger levels have to be added there first, so the page reads both at build time. The history `observations` description in `api/schemas.py` ("Raw readings") is outdated too: the endpoint serves the cleaned series.
