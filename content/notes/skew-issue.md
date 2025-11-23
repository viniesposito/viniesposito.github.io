+++
date = '2025-11-22T16:57:14-05:00'
title = 'Skew Issue'
[params]
    math = true
+++

![I Got Rekt By a 12 Year Old](/rekt_csgo.png)

If, after staring at fictional numbers all day, you, like me, sometimes log in your favorite game to unwind and click some virtual heads only to get destroyed by kids who are years away from having their first facial hair... that's a skill issue.

Skew issue[^1], on the other other hand, is what I am naming the fact that you could go pretty far answering quirky vol questions by simply blaming skew for existing. While a bit of a niche meme, it does not seem unreasonable to attack questions around weird behavior of derivatives trading by first wondering how skew can be behind it.

In any case, here's a list[^2] of questions that I think can be answered (either completely or mostly) with "because of skew":

- Why can a delta-hedged option have a persistent drift in P&L even when implied vol stays constant?
- Why is it that buying a calendar spread (in vol space) can land you in being short crash territory?
- Why does delta-hedged vega bleed differ between OTM puts and OTM calls?
- Why does a barrier option earn or lose money before the barrier is even touched?
- Why does forward-starting stuff inherit delta?
- Why is a variance swap short delta if you hedge it with Black-Scholes deltas?
- Why does the replication of a corridor variance swap come with introduction of delta exposure?
- Why does the implied correlation of a basket differ from the average of pairwise implied correlations?

[^1]: Shout-out to PedroZ for coming up with "skew issue", although in a different context.
[^2]: Not comprehensive, potentially not correct, and certainly biased towards what I do (I am _not_ an exotics person...).
