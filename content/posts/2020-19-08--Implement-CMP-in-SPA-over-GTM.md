---
title: How to implement Cookiebot Consent Manager in your Single Page Application over Tag Manager
date: "2020-08-19T09:17:31.121Z"
template: "post"
draft: false
slug: "how-to-implement-cookiebot-consent-manager-in-your-single-page-application-over-tag-manager"
category: "Tag Management"
tags:
    - "Google Tag Manager"
    - "Consent Management"
description: "Explains how to set up the Cookiebot Consent Management Platform over Google Tag Manager in your Single Page Application."
socialImage: ""
---

One thing I noticed after several implementations of _Consent Management Platforms_ (_CMP_) is, that there usually aren't any good implementation documentations for [_Single Page Applications_](https://en.wikipedia.org/wiki/Single-page_application) (_SPA_).

Thus, I've decided to use the [Cookiebot Consent Manager free tier](https://www.cookiebot.com/en/pricing/) as an example to demonstrate one way how a custom implementation can be done in a SPA context.

Cookiebot offers some very useful templates to get you started and make the installation for [traditional websites](https://www.robinwieruch.de/web-applications) over Google Tag Manger a breeze. Unfortunately, for Single Page Applications, we need to make some adjustments.

There're several ways to make it work, however, I found replicating the Cookiebot Tag behavior for regular websites the easiest. All you need is some custom JavaScript and a trigger, which fires when the URL changes.

## GTM setup

First, follow the instructions laid out on the [Cookiebot website](https://support.cookiebot.com/hc/en-us/articles/360003793854-Google-Tag-Manager-deployment) until you get to the third section _3. Implementing the cookie declaration_.

The Cookiebot tag pushes at least one of three consent options (statistics, preferences, and marketing) as a _custom event_ to the GTM _data layer_. Once right after a user gave his consent, and once upon every full page (re)load, if the user already consented.

[![Consent Banner](/media/cmp-setup-spa/cookie_consent_banner_accept_statistics.jpg)](/media/cmp-setup-spa/cookie_consent_banner_accept_statistics.jpg)

<!-- prettier-ignore -->
For example, if we allow the cookies labeled as _Statistics_ to be set, the *cookie\_consent\_statistics* event is pushed to the data layer.

[![Data Layer Push](/media/cmp-setup-spa/data_layer_push_cookie_consent_statistics.jpg)](/media/cmp-setup-spa/data_layer_push_cookie_consent_statistics.jpg)

The triggers you've just created in step 2. recognize the _custom event push_ by the _Cookiebot Tag_ and activate the tags they have been assigned to (e.g., if applied, the _Cookie Consent Statistics_ trigger now activates the Google Analytics tag).

[![Activate Google Analytics](/media/cmp-setup-spa/cookie_consent_statistics_trigger_activates_GA.jpg)](/media/cmp-setup-spa/cookie_consent_statistics_trigger_activates_GA.jpg)

<!-- prettier-ignore -->
However, in a SPA context, there won't be a new page load while we browse the site unless we do a manual refresh. That means, the Cookiebot tag won't push a new *cookie\_consent\_statistics* event to the data layer in case the URL changes. As such, the GA tag won't initiate a new page view hit as we move from site to site.

To enable this functionality, we need to replicate the behavior of the Cookiebot tag for **every** virtual change of the URL (aka _route-change_), not just after the user consented or the page reloads.

We can do this with some custom JavaScript: create a new Tag of type _Custom HTML_ and paste in the following:

```javascript
<script>
    var cookieConsent = {{Cookie Consent}};

    if (/statistics/.test(cookieConsent)) {
        dataLayer.push({event: "cookie_consent_statistics"})
    }
    if (/preferences/.test(cookieConsent)) {
        dataLayer.push({event: "cookie_consent_preferences"})
    }
    if (/marketing/.test(cookieConsent)) {
        dataLayer.push({event: "cookie_consent_marketing"})
    }
</script>
```

Whenever the code runs, it reads the current value from the GTM _Cookie Consent_ variable you created earlier and pushes a custom event into the data layer for every match it finds.

<!-- prettier-ignore -->
For instance, if the value of _cookieConsent_ equals _|statistics|preferences|_, both events *cookie\_consent\_statistics* and *cookie\_consent\_preferences* will be pushed to the data layer.

That is exactly what the Cookiebot tag is doing on a page reload. However, we want that behavior for **every** route-change.

[![Custom HTML](/media/cmp-setup-spa/customHTML_tag_pushConsentToDL.jpg)](/media/cmp-setup-spa/customHTML_tag_pushConsentToDL.jpg)

I named the Tag _CustomHTML - pushConsentToDL_, but feel free to choose any other naming that you may find more appropriate.

You might've noticed the trigger in the screenshot above. It's responsible that the custom HTML gets fired on every route-change. For this trigger to be activated, we need another _custom event_ that is pushed from your website's (or application's) source code into the data layer on every URL change, e.g.:

`{event: 'url-change'}`

In case there isn't such a data layer push in your source code yet, you either have to implement it yourself or ask a web-developer for help. Unfortunately, there are so many ways to implement it depending on the technologies you use, that I can't list them all here.

Luckily, in my case, the push of the _custom event_ is already provided (by [the gatsby-plugin-google-tagmanager plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-google-tagmanager/)):

`{event: 'gatsby-route-change'}`

Please note, that I'm continuing to refer to the term _gatsby-route-change_ from now on. Just think of it as a placeholder if you're not familiar with [Gatsby](https://www.gatsbyjs.com/). You can replace it with any other custom event name (e.g. _url-change_).

I've created a _gatsby-route-change_ trigger to listen for the custom event to emerge from the plugin. Since the _gatsby-route-change_ event is pushed to the data layer on every virtual URL change, the trigger invokes the tags it's assigned to on every URL change as well (e.g. the Google Analytics tag).

Sadly, there is yet another issue you might encounter. In my case, the custom _gatsby-route-change_ event is not only pushed to the data layer when the URL actually changes but upon each page (re)load as well. This leads to the _GA page view hit_ being sent twice instead of just once on a page load (remember: the first hit is initiated by the _Cookiebot_ tag).

To avoid the _GA page view hit_ from being sent out twice, I used a variable of type _Custom JavaScript_, which returns _false_ before, and _true_ after the _gtm.load event_ has occurred. That way, if we assign it as a condition to the _gatsby-route-change_ trigger, we essentially ignore the first _gatsby-route-change_ event. In other words, we only invoke the trigger if the page load has already happened, and the URL changes for the first time.

```javascript
function() {
  var gtmLoad = window.dataLayer.find(function(item) {
    return item.event === "gtm.load";
  });
  return !!gtmLoad;
}
```

[![Custom JavaScript](/media/cmp-setup-spa/custom_js_variable_to_catch_gtmLoad_event.jpg)](/media/cmp-setup-spa/custom_js_variable_to_catch_gtmLoad_event.jpg)

Now, I recommend to copy the original _gatsby-route-change_ trigger, rename and modify it, so it only fires when the _Custom JavaScript_ variable _equals true_, i.e. after the page has fully loaded.

[![Adapt trigger](/media/cmp-setup-spa/gatsby-route-change_trigger_notOnFirstLoad.jpg)](/media/cmp-setup-spa/gatsby-route-change_trigger_notOnFirstLoad.jpg)

Be aware, that with this workaround, we leave one edge case uncovered: we don't collect the page views that occur, before the _gtm.load_ event took place. I think it is very unlikely, that a user navigates to the next page, right after he arrived on the landing page. However, if he does, we don't register it in Google Analytics.

Finally, don't forget to assign the modified trigger (here: _gatsby-route-change - notOnFirstLoad_) to the Custom HTML tag.

## Heads-Up

I'd like to briefly discuss two ways that look like shortcuts at first glimpse, but turn out to trigger false behavior.

1. You might be tempted to just add _gatsby-route-change_ as an additional trigger to the Cookiebot Tag and be done with it. Technically, it works, however, it throws an error message to the console of your developer tools in your browser, since you now reload the whole library on every route-change. That's not ideal.

2. Technically, it's also possible to use the baked-in _History Change_ trigger type, instead of a custom event like _gatsby-route-change_, since both listen to events emitted by the [_History API_](https://developer.mozilla.org/en-US/docs/Web/API/History_API).

However, the _History API_ might also be used to add [_fragments_](https://stackoverflow.com/questions/30997420/what-are-fragment-urls-and-why-to-use-them) or replace URL entries.

In that case, it would push a _gtm.historyChange_ event to the data layer and, if applied to the GA tag, accidentally trigger a pageview hit. You need to control for these possibilities, which makes it prone to errors.

Hence, I generally recommend implementing a data layer push of a custom event like _gatsby-route-change_ into your website or app. If your site is still small and you don't have the resources needed, this workaround might be worth looking into nonetheless.

## Verify correct setup

Don't forget to test every case a user might encounter while engaging with your website. This might take some while, but it's better to be safe than sorry.

**Pro Tip**: use the website check on the [Cookiebot homepage](https://www.cookiebot.com/en/) to validate your setup.

[![Cookiebot Website Check](/media/cmp-setup-spa/cookiebot_website_check.jpg)](/media/cmp-setup-spa/cookiebot_website_check.jpg)

<!--
For your convenience, I've exported the container settings for you to easily import it in your GTM account. While I've tested the setup myself, I can't guarantee that it does work under every circumstance. You need to always make a test run yourself!
 -->

## Summary

The manual implementation may seem a little daunting at first. Nevertheless, I hope I was able to shed some light on how you can do a solid implementation yourself in a SPA context with Cookiebot.

Note, that there is also an automatic cookie blocking method, which might be easier to set up since you don't have to control everything manually. Unfortunately, I haven't looked into it yet (since it comes with its own challenges). See [Google Tag Manager and Automatic cookie blocking](https://support.cookiebot.com/hc/en-us/articles/360009192739) for more information.

That’s it, folks. I hope you enjoyed the article. Thanks for reading!

<hr>

Something missing, or you still find it confusing? **Leave a comment below!**

<!-- put into the author component
Want some help with your custom Consent Manager implementation? **Get in touch!**
-->
