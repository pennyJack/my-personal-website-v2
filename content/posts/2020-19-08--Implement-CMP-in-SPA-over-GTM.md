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

One thing I noticed after several implementations of _Consent Management Platforms_ (_CMP_) is that there usually aren't any proper implementation documentations for [_Single Page Applications_](https://en.wikipedia.org/wiki/Single-page_application) (_SPA_).

Thus, I've decided to use the [Cookiebot Consent Manager free tier](https://www.cookiebot.com/en/pricing/) as an example to demonstrate one way how you can do a custom implementation in a SPA context.

Cookiebot offers some handy templates to get you started and make the installation for [traditional websites](https://www.robinwieruch.de/web-applications) over Google Tag Manger a breeze. Unfortunately, for Single Page Applications, we need to make some adjustments.

There're several ways to make it work. I found **replicating the Cookiebot Tag behavior for regular websites** the easiest. All you need is some custom JavaScript and a trigger, which fires when the URL changes.

## GTM setup

First, follow the instructions laid out on the [Cookiebot website](https://support.cookiebot.com/hc/en-us/articles/360003793854-Google-Tag-Manager-deployment) until you get to the third section _3. Implementing the cookie declaration_.

The Cookiebot tag pushes at least one of three consent options (statistics, preferences, and marketing) as a _custom event_ to the GTM _data layer_. Once right after a user gave his consent, and once upon every full page (re)load following the assent.

[![Consent Banner](/media/cmp-setup-spa/cookie_consent_banner_accept_statistics.jpg)](/media/cmp-setup-spa/cookie_consent_banner_accept_statistics.jpg)

<!-- prettier-ignore -->
For example, if we allow the site's scripts labeled as _Statistics_ to set cookies, the *cookie\_consent\_statistics* event is pushed to the data layer.

[![Data Layer Push](/media/cmp-setup-spa/data_layer_push_cookie_consent_statistics.jpg)](/media/cmp-setup-spa/data_layer_push_cookie_consent_statistics.jpg)

The triggers you've just created in step 2. (_Controlling cookies_) recognize the _custom event push_ by the Cookiebot tag and activate the tags they have been assigned to (e.g., if applied, the _Cookie Consent Statistics_ trigger now activates the Google Analytics tag).

[![Activate Google Analytics](/media/cmp-setup-spa/cookie_consent_statistics_trigger_activates_GA.jpg)](/media/cmp-setup-spa/cookie_consent_statistics_trigger_activates_GA.jpg)

<!-- prettier-ignore -->
However, in a SPA context, there won't be a new page load while we browse the site unless we do a manual refresh. That means the Cookiebot tag won't push a new *cookie\_consent\_statistics* event to the data layer if the URL changes. As such, the GA tag won't initiate a new page view hit as we move from site to site.

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

It’s precisely what the Cookiebot tag is doing on a page reload. However, we want this behavior for **every** route-change.

[![Custom HTML](/media/cmp-setup-spa/customHTML_tag_pushConsentToDL.jpg)](/media/cmp-setup-spa/customHTML_tag_pushConsentToDL.jpg)

I named the Tag _CustomHTML - pushConsentToDL_, but feel free to choose any other naming that you may find more appropriate.

You might've noticed the trigger in the screenshot above. It's responsible that the custom HTML gets fired on every route-change. For this trigger to be activated, we need to push another _custom event_ from your website's (or application's) source code into the data layer, e.g.:

`{event: 'url-change'}`

This event notifies us when the URL changes as a result of the user navigating our website.

In case there isn't such a data layer push in your source code yet, you either have to implement it yourself or ask a web-developer for help. Unfortunately, there are so many ways to achieve it depending on the technologies you use, that I can't list them all here.

Luckily, in my case, the push of the custom event is already provided (by [the gatsby-plugin-google-tagmanager plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-google-tagmanager/)):

`{event: 'gatsby-route-change'}`

Please note, that I'm continuing to refer to the term _gatsby-route-change_ from now on. Just think of it as a placeholder if you're not familiar with [Gatsby](https://www.gatsbyjs.com/). You can replace it with any other custom event name (e.g., _url-change_).

I've created a _gatsby-route-change_ trigger to listen for the _gatsby-route-change_ event to emerge. Since the plugin pushes the event to the data layer on every virtual URL change, the trigger invokes the tags it's assigned to on every URL change as well (e.g., the Google Analytics tag).

Sadly, there is yet another issue you might encounter. In my case, the custom _gatsby-route-change_ event is not only pushed to the data layer when the URL changes but upon each page (re)load. It leads to the _GA page view hit_ being sent twice instead of just once on a page load (remember: the _Cookiebot_ tag initiates the first hit).

[![GA page view hit sent twice](/media/cmp-setup-spa/ga_page_view_hit_sent_twice.jpg)](/media/cmp-setup-spa/ga_page_view_hit_being_sent_twice.jpg)

To avoid the _GA page view hit_ from being fired twice, I used a variable of type _Custom JavaScript_, which returns _false_ before, and _true_ after the _gtm.load event_ has occurred.

If we assign it as a condition to the _gatsby-route-change_ trigger, we ignore the first _gatsby-route-change_ event. In other words, we only invoke the trigger if the page load has already happened, and the URL changes for the first time.

```javascript
function() {
  var gtmLoad = window.dataLayer.find(function(item) {
    return item.event === "gtm.load";
  });
  return !!gtmLoad;
}
```

[![Custom JavaScript](/media/cmp-setup-spa/custom_js_variable_to_catch_gtmLoad_event.jpg)](/media/cmp-setup-spa/custom_js_variable_to_catch_gtmLoad_event.jpg)

Now, I recommend to copy the _gatsby-route-change_ trigger (the original trigger without the condition might be useful in another context), rename and modify it, so it only fires when the _Custom JavaScript_ variable _equals true_, i.e., after the page has fully loaded.

[![Adapt trigger](/media/cmp-setup-spa/gatsby-route-change_trigger_notOnFirstLoad.jpg)](/media/cmp-setup-spa/gatsby-route-change_trigger_notOnFirstLoad.jpg)

Be aware that this workaround leaves one edge case uncovered: we don't collect the page views that occur, before the _gtm.load_ event took place. I think it is improbable that a user navigates to the next page, right after arriving on the landing page. However, if he does, we don't register it in Google Analytics.

Finally, don't forget to assign the modified trigger (here: _gatsby-route-change - notOnFirstLoad_) to the custom HTML tag.

## Alternative implementation using the History change trigger

It's possible to use the baked-in [_History change_](https://support.google.com/tagmanager/answer/7679322?hl=en) trigger type instead of the custom _gatsby-route-change - notOnFirstLoad_ trigger. Both triggers are only invoked when the URL changes after the initial page load.

The advantage is less setup work. You don't have to ensure that your website pushes a custom event like _'url-change'_ to the data layer, nor do you have to create the custom JavaScript variable from above.

However, the _History change_ trigger is also activated when your source code adds [_fragments_](https://stackoverflow.com/questions/30997420/what-are-fragment-urls-and-why-to-use-them) or replaces URL entries (by manipulating the [_History API_](https://developer.mozilla.org/en-US/docs/Web/API/History_API)).

Say, someone clicks on a link and is brought to a section further down the same page, which is indicated by adding a hash sign to the end of the URL (e.g., example.com/interesting-article**#some-section**). It would push a _gtm.historyChange_ event to the data layer and, if we applied the History change trigger to our custom HTML, fire a GA pageview hit. That might not be what you want.

Hence, I generally recommend implementing a data layer push of a custom event like _url-change_ into your website or app. If your site is still small and you don't have the resources needed, this workaround might be worth looking into nonetheless.

## Verify correct setup

Your GTM container's _Workspace Changes_ should now look somewhat familiar to the following:

[![GTM Container summary](/media/cmp-setup-spa/gtm_container_summary.jpg)](/media/cmp-setup-spa/gtm_container_summary.jpg)

Don't forget to test every case a user might encounter while engaging with your website. It might take some time, but it's better to be safe than sorry.

**Pro Tip**: use the website check on the [Cookiebot homepage](https://www.cookiebot.com/en/) to validate your setup.

[![Cookiebot Website Check](/media/cmp-setup-spa/cookiebot_website_check.jpg)](/media/cmp-setup-spa/cookiebot_website_check.jpg)

<!--
For your convenience, I've exported the container settings for you to import it in your GTM account easily. While I've tested the setup myself, I can't guarantee that it works under every circumstance. You always need to make a test run yourself!
 -->

## Summary

The manual implementation for a SPA may seem a little daunting at first. Nevertheless, I hope to have shed some light on how you can do a sound installation yourself with Cookiebot.

Note that there is also an automatic cookie blocking method that might be easier to set up since you don't have to control everything manually. Unfortunately, I haven't looked into it yet (since it comes with its challenges). See [Google Tag Manager and Automatic cookie blocking](https://support.cookiebot.com/hc/en-us/articles/360009192739) for more information.

That’s it, folks. I hope you enjoyed the article. Thanks for reading!

<hr>

Something missing, or you still find it confusing? **Leave a comment below!**

<!-- put into the author component
Want some help with your custom Consent Manager implementation? **Get in touch!**
-->
