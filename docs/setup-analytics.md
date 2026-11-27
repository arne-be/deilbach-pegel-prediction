# Analytics setup

The page counts visits with Umami Cloud (free Hobby plan): no cookies, nothing stored on the visitor's device, so no consent banner. The script loads only when `site.analytics.website_id` in `config/pegel.json` is set. All of this is done once.

1. **Account.** Sign up at https://cloud.umami.is and choose the **EU** data region. It can't be changed later without Umami's support.
2. **Data processing agreement.** Accept Umami's DPA (https://umami.is/dpa) for the account. The privacy page says one is in place.
3. **Website.** Add the website with the domain `deilbach-pegel.energiekonzepte-ruhr.de`. Umami shows a tracking code with a script URL and a website id.
4. **Config.** Put the id in `site.analytics.website_id`. If the script URL in the tracking code differs from `script_url`, change that too. Merge; the script and the Umami section of the privacy page appear with the next deploy.
5. Open the page and check that the visit shows up in Umami. Click a support tier and check for the event `support-click`.

What is counted:

- Page views without the query string, only on the configured domain, and not for browsers that send "Do Not Track".
- `support-click` (support section) and `support-prompt-click` (the prompt), each with `option`: the tier id, `einmalig-<eur>` or `einmalig-frei`.

The privacy page (`web/src/pages/datenschutz.astro`) describes exactly this. Change both together. Its text was not written by a lawyer; the client decides whether to have it checked.
