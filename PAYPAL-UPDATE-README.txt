PAYPAL CONTRIBUTION UPDATE — 15 September 2026

PUBLISH
Extract this ZIP and upload its contents to the website's existing web root,
with index.html at the root. Upload the full assets folder and updated sw.js.
No build step, PayPal API key, password or private credential is needed.
Keep the included CNAME and hosting settings for the existing domain.

CHANGES
Public payment URL: https://www.paypal.com/ncp/payment/5G73RZBHR63NS
Original supplied QR image: assets/Support Willis-qrcode.png (unchanged).
PayPal contribution sections appear on the home page and donate.html.
Donation calls to action and shared Donate navigation open PayPal in a new tab.
Campaign-page payment buttons explicitly identify Foundation support.
Existing bank-transfer details, contact links and campaign content are retained.
Privacy/security information now explains the external PayPal payment flow.
The offline cache version is updated; external requests bypass the site cache.

CHECKS COMPLETED
All 24 HTML pages checked for internal link/fragment and referenced asset targets:
no broken targets found. No browser JavaScript errors observed.
Home, Donate, Campaign and Get involved pages checked at widths of 375, 768 and
1440 pixels: no horizontal page overflow. Contribution design visually reviewed.
Contribution-button click opens the exact supplied PayPal URL in a new tab.
The supplied QR image was copied byte-for-byte, confirmed by matching hashes.

CHECKOUT LIMITATION
The external PayPal page could not be verified in this environment. The button
test used an intercepted response to check navigation only. No payment was made;
recipient, available currencies, amount settings and payment methods were not
independently confirmed. Open the payment page after publication to review these.
