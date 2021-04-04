---
title: Block your Tags from firing without consent with Trigger exceptions
date: '2021-03-31T08:35:00.121Z'
template: 'post'
draft: false
slug: 'block-your-tags-from-firing-without-consent-with-trigger-exceptions'
category: 'Tag Management'
tags:
  - 'Best Practices'
  - 'Consent Management'
  - 'Google Tag Manager'
description: 'Describes how to use Trigger exceptions as Blockers for a more efficient Tag- and Consent-Management.'
socialImage: ''
---

In this short post, I’d like to share a different approach to handling your Tags according to your website visitor’s consent. Rather than creating a custom event Trigger that fires a Tag only under certain circumstances, you may invoke a Tag unconditionally and **let a blocking Trigger jump in** if the condition is <span style="text-decoration:underline;">not</span> met. That makes your (custom event) Triggers **a lot more reusable**.

## Motivation

Let’s say you have **three different technologies categorized into three distinct consent groups**: _preferences_, _statistics_, and _marketing_. All three Tags should load when the _addToCart_ event occurs, and the user consented.

To achieve this, you could create an _addToCart_ custom event Trigger for each consent category, only firing the Tag if the necessary consent for that category has been given, like so:

[![CE - addToCart - preferences](/media/use-trigger-exceptions/CE_addToCart_preferences_conditioned.jpg)](/media/use-trigger-exceptions/CE_addToCart_preferences_conditioned.jpg)

Unfortunately, you have to **repeat** this for each consent group.

[![CE - addToCart - statistics](/media/use-trigger-exceptions/CE_addToCart_statistics_conditioned.jpg)](/media/use-trigger-exceptions/CE_addToCart_statistics_conditioned.jpg)

[![CE - addToCart - marketing](/media/use-trigger-exceptions/CE_addToCart_marketing_conditioned.jpg)](/media/use-trigger-exceptions/CE_addToCart_marketing_conditioned.jpg)

As you might have guessed, this can **become pretty tedious quickly**, particularly if you have more than just the _addToCart_ event your Tags need to listen to (e.g., an additional "_newsletterSubscription_" and an "_addToWhislist_" event).

Assuming you have three events and three consent categories, it would make **a total of nine new Triggers in GTM**: one for each combination of category type and custom event. Your container may soon become **inflated** with lots of different Triggers.

Using **Trigger exceptions**, you just need to create a single blocking Trigger for each consent group **once** and then reuse them along with each custom event.

## GTM setup

Instead of generating three Triggers listening to the _addToCart_ event, **we only integrate one** and apply it to each Tag that needs to be invoked when the event is pushed to the dataLayer.

[![CE - addToCart](/media/use-trigger-exceptions/CE_addToCart.jpg)](/media/use-trigger-exceptions/CE_addToCart.jpg)

Since our custom event Trigger fires on **all** custom events, we also need to **apply a Blocker as a Trigger exception**. Otherwise, the Tag would fire whether the visitor gave or didn’t give his consent.

[![HTML - someMarketingTechnology](/media/use-trigger-exceptions/HTML_someMarketingTechnology_withBlocker.jpg)](/media/use-trigger-exceptions/HTML_someMarketingTechnology_withBlocker.jpg)

Great, but how do we set up these **Blockers** now? Glad you asked! I’m using the Marketing category as an example. Of course, you need to set up a blocking Trigger for each category your users may opt-out of and apply it accordingly.

[![CE - cookie_consent_marketing - not_accepted](/media/use-trigger-exceptions/CE-cookie_consent_marketing-not_accepted_detailedView.jpg)](/media/use-trigger-exceptions/CE-cookie_consent_marketing-not_accepted_detailedView.jpg)

As you can see in the screenshot, we use a unique character for the event name and activate the "_Use regex matching_" checkbox. The "_.\*_" serves as a **wildcard**, i.e., the Trigger matches **<span style="text-decoration:underline;">every</span>** GTM event pushed to the dataLayer.

Yet, we set a condition to ensure the Blocker is not invoked on every occasion, but only when the user has **<span style="text-decoration:underline;">not</span>** allowed us to use marketing technologies on our website.

Now, whenever the _addToCart_ event occurs on your homepage, GTM **blocks** the "_HTML - someMarketingTechnology_" Tag if there is no consent.

## Verify correct setup

After creating and applying those Blockers, review the different technologies’ behavior by **properly testing your consent categories** in "_Preview_" mode.

## Summary

Creating Blockers is **not required** for your consent implementation to work correctly, but it might help you keep your GTM container lean by reusing some of the logic you already created. See it more as **best practice** and not as being mandatory.

That’s it, folks. I hope you enjoyed the article. Thanks for reading!

<hr>

Something missing, or you still find it confusing? **Leave a comment below!**
