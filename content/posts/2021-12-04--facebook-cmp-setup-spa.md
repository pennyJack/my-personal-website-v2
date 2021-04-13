---
title: How to integrate the Facebook Pixel into an existing Cookiebot setup over GTM
date: '2021-04-13T08:05:00.121Z'
template: 'post'
draft: false
slug: 'how-to-integrate-the-facebook-pixel-into-an-existing-cookiebot-setup-over-gtm'
category: 'Consent Management'
tags:
  - 'Cookiebot'
  - 'Facebook Pixel'
  - 'Google Tag Manager'
  - 'Single Page Application'
description: 'Provides a step-by-step guide on implementing the Facebook Pixel into an existing Cookiebot setup for a Single Page Application over Google Tag Manager.'
socialImage: ''
---

If you followed my tutorial on "[How to implement Cookiebot Consent Manager in your Single Page Application over Tag Manager](how-to-implement-cookiebot-consent-manager-in-your-single-page-application-over-tag-manager)," you’ve already successfully implemented the [Cookiebot](https://www.cookiebot.com/en/) Consent Manager. Correctly integrating a Consent Management System into an existing Tag setup is not easy and **comes with unique challenges** compared to traditional website architecture.

In this post, I’d like to **share my insights on putting the [Facebook Pixel](https://developers.facebook.com/docs/facebook-pixel) into the mix**.

## Motivation

Unlike Google Analytics, upon loading, the Facebook pixel [attaches an event listener](https://developers.facebook.com/docs/facebook-pixel/implementation/tag_spa) to trigger a _PageView_ event automatically when the state of the [History API](https://flaviocopes.com/history-api/) changes as the visitor navigates your website.

Generally, this is pretty useful. You don’t have to worry about firing the PageView event yourself, as we did in the article I mentioned at the top. However, if we want to be **GDPR compliant**, we need to tell the listener that it has to **stop sending requests** to Facebook if a visitor **revokes his consent**. Doing so is a bit more tricky than just creating a dedicated Trigger in Google Tag Manager.

I will go through the setup with you step by step and point out common mistakes and things you need to keep in mind.

## Preparation

Going forward, I assume that you’ve already successfully implemented the Facebook Pixel base code and are [capturing events on your website](https://developers.facebook.com/docs/facebook-pixel/implementation/tag_spa) with it. In case you haven’t, please follow the steps outlined in [Facebook’s Developer Documentation](https://developers.facebook.com/docs/facebook-pixel/implementation) first.

As for the [consent classes](https://support.cookiebot.com/hc/en-us/articles/360003806473-Can-I-rename-the-4-cookie-categories-), I also assume that you have at least one label called "_Marketing_" or something similar. That’s where the Facebook Pixel belongs.

If we think about when to load any of Facebook’s [standard events](https://developers.facebook.com/docs/facebook-pixel/reference), we can broadly put them into **three categories**:

1. Events that load on **every** URL route change (mainly the _PageView_ event)
2. Events that load on **some** route changes (e.g., the _ViewContent_ event)
3. Events that fire at **some point after the route change** has occurred (e.g., the _AddToCart_ event)

This categorization helps us better understand how to integrate the Facebook Pixel (or any other Marketing technology) with a Consent Management Tool.

We need to handle each category a little differently. It may sound rather abstract now but will get more apparent as we carry on.

## GTM setup

Let’s start with the **third**. To invoke a Marketing Tag in a compliant way after the _AddToCart_ event has occurred, you have **two options**. Either you limit your Tag’s Trigger by only firing when the Marketing category was consented to, or you apply a [Trigger exception](https://support.google.com/tagmanager/answer/7679318?hl=en&ref_topic=7679384) and use it as a blocker. The latter prevents your Tag from firing when the user hasn’t given his consent.

### Using a condition

<figcaption>Custom HTML Tag using a conditoned Trigger</figcaption>

[![Custom HTML Tag using a conditoned Trigger](/media/facebook-cmp-setup-spa/setup_0_HTML_fbEvent_AddToCart_with_conditioned_trigger.jpg)](/media/facebook-cmp-setup-spa/setup_0_HTML_fbEvent_AddToCart_with_conditioned_trigger.jpg)

<figcaption>Custom Event with condition</figcaption>

[![Custom Event with condition](/media/facebook-cmp-setup-spa/setup_1_CE_addToCart_marketing_conditioned.jpg)](/media/facebook-cmp-setup-spa/setup_1_CE_addToCart_marketing_conditioned.jpg)

### Using a blocker

<figcaption>Custom HTML Tag using a Trigger exception</figcaption>

[![Custom HTML Tag using a Trigger exception](/media/facebook-cmp-setup-spa/setup_2_HTML_fbEvent_AddToCart_with_trigger_blocker.jpg)](/media/facebook-cmp-setup-spa/setup_2_HTML_fbEvent_AddToCart_with_trigger_blocker.jpg)

<figcaption>Custom Event without condition</figcaption>

[![Custom Event without condition](/media/facebook-cmp-setup-spa/setup_3_CE_addToCart_marketing_not_conditioned.jpg)](/media/facebook-cmp-setup-spa/setup_3_CE_addToCart_marketing_not_conditioned.jpg)

<figcaption>Trigger exception for Marketing Tags</figcaption>

[![Trigger exception for Marketing Tags](/media/facebook-cmp-setup-spa/setup_4_CE-cookie_consent_marketing-not_accepted.jpg)](/media/facebook-cmp-setup-spa/setup_4_CE-cookie_consent_marketing-not_accepted.jpg)

I prefer to use blockers since you can **reuse them** on different tags. I’ve written [a short article](block-your-tags-from-firing-without-consent-with-trigger-exceptions) explaining my motivation.

The same rationale also applies to the **second** mental category.

The **first** gets more complicated because the Facebook pixel (_fbevents.js_) registers an event listener that **detects virtual changes to the URL automatically**. Nevertheless, we need to **detach** the event listener if the website visitor decides to revoke his consent.

You could [stop sending PageView events automatically](https://developers.facebook.com/docs/facebook-pixel/implementation/tag_spa) by setting the fbq property "_disablePushState_" to "_true_":

```javascript
fbq.disablePushState = true;
```

Unfortunately, you can only deactivate it during the Facebook pixel’s initialization, not dynamically in a [callback](https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced) later. Once we deactivate the listener, **we can’t turn it on again**, thus not tracking the _PageView_ event anymore. That’s not what we want.

You can **dynamically revoke or grant automatic tracking** with the global _[fbq('consent')](https://developers.facebook.com/docs/facebook-pixel/implementation/gdpr)_ function. Firing _fbq('consent', 'revoke')_ will prevent **all** Facebook technology from firing. However, the only technology that your CMP setup isn’t controlling yet in GTM is the _PageView_ event.

_"Okay, but how am I supposed to fire that fbq('consent') function the moment my visitor interacts with the Cookie Banner?"_ you may ask.

Well, Cookiebot offers us some neat functionality that we can use in a **custom setting** like this one. The [Cookiebot SDK](https://www.cookiebot.com/en/developer/) provides a handy callback function when the user accepts or declines the Cookie Banner: _CookiebotOnAccept_ and _CookiebotOnDecline_.

In your Tag Manager, **create a new Custom HTML Tag** and paste in the following code snippet:

```HTML
<script>
  function CookiebotCallback_OnAccept() {
    if (Cookiebot.consent.marketing) {
      if (window.fbq) {
        fbq('consent', 'grant');
      }
    }
  }

  function CookiebotCallback_OnDecline() {
    if (!Cookiebot.consent.marketing) {
      if (window.fbq) {
        fbq('consent', 'revoke');
      }
    }
  }
</script>
```

Save the Tag (you may call it “_HTML - Cookiebot - registerCallbacks_”) without applying a Trigger.

[![HTML - Cookiebot - registerCallbacks](/media/facebook-cmp-setup-spa/setup_5_HTML_Cookiebot_registerCallbacks.jpg)](/media/facebook-cmp-setup-spa/setup_5_HTML_Cookiebot_registerCallbacks.jpg)

Go into your Cookiebot Tag and select the newly created custom HTML Tag as a “_Cleanup Tag_” under “_Tag Sequencing_.”

[![Cookiebot Tag](/media/facebook-cmp-setup-spa/setup_6_Cookiebot_Tag_cleanup.jpg)](/media/facebook-cmp-setup-spa/setup_6_Cookiebot_Tag_cleanup.jpg)

It will ensure that the two custom event listeners we created will be **attached permanently** after GTM has initialized Cookiebot.

Now we **grant or revoke the Facebook tracking** whenever a user interacts with the cookie banner. If he revokes his consent now, Facebook won't send a _PageView_ request anymore.

**<span style="text-decoration:underline;">Pro tip</span>**: make sure you load the Facebook pixel only "_Once per page_" and not "_Once per event_." The pixel **might fire twice** when a visitor revokes and then grants his consent again.

The implementation works fine if you load the pixel more than once. Still, it’s unnecessary to do so (you **may get a warning** in the console of your developer tools that it has detected a duplicate Facebook ID).

[![Console warning - Duplicate Pixel ID](/media/facebook-cmp-setup-spa/setup_7_FB_duplicate-pixel-id.jpg)](/media/facebook-cmp-setup-spa/setup_7_FB_duplicate-pixel-id.jpg)

## Verify correct setup

While in [Preview Mode](https://support.google.com/tagmanager/answer/6107056?hl=en), you can either check the **Network tab** of your developer tools or inspect your **Facebook Events Manager** if the pixel doesn't send requests anymore after you've revoked your consent.

## Summary

Implementing tracking in a SPA context **GDPR compliant** is cumbersome. Nonetheless, I hope this guide helps you to integrate the Facebook Tracking Pixel the right way.

Please note that my solution may not be the only one out there. It’s just what I’m currently using and may be subject to change. Further, please also note that I’m <span style="text-decoration:underline;">not a legal expert</span> but a marketing developer. While I employ the setup myself, applying it happens at your own risk.

That’s it, folks. I hope you enjoyed the article. Thanks for reading!

<hr>

Something missing, or you still find it confusing? **Leave a comment below!**
