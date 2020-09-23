---
title: Four ways how to handle opaque traffic after installing a Consent Manager
date: "2020-09-23T06:34:25.000Z"
template: "post"
draft: false
slug: "four-ways-how-to-handle-opaque-traffic-after-installing-a-consent-manager"
category: "Consent Management"
tags:
    - "Consent Management"
    - "Consent Manager"
    - "Tracking"
description: "Explores different options on how to handle the data drop after implementing a Consent Management system."
socialImage: "/media/handle-opaque-traffic/hong-kong_traffic.jpg"
---

[![Traffic in Hong Kong by night](/media/handle-opaque-traffic/hong-kong_traffic.jpg)](/media/handle-opaque-traffic/hong-kong_traffic.jpg)

One outcome of the [General Data Protection Regulation](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation), or GDPR in short, is for companies that want to track and analyze their website visitors’ behavior to implement a [Consent Management Platform](https://clearcode.cc/blog/consent-management-platform/).

Seamlessly implementing such a consent manager in the existing marketing technology stack [can be quite demanding](how-to-implement-cookiebot-consent-manager-in-your-single-page-application-over-tag-manager). However, once you successfully deploy the consent management system, new challenges arise since website visitors now confronted with the consent banner tend to reject their consent. That is, **a part of your traffic may not be visible anymore**.

In the following, I will discuss several options you can do to mitigate your consent management’s negative impact.

Please note that this is not a comprehensive article but should give you an overview of options you may explore further.

Last but not least, be aware that my article doesn’t replace a proper legal consultation.

## Option A - Legitimate Interest

[Article 6(1)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679&from=EN#d1e1888-1-1) of the GDPR states the six lawful bases which permit personal data processing. 6(1)(f) explicitly states that under certain circumstances, the processing of personal information is allowed if no other basis applies but a [legitimate interest](https://ec.europa.eu/info/law/law-topic/data-protection/reform/rules-business-and-organisations/legal-grounds-processing-data/grounds-processing/what-does-grounds-legitimate-interest-mean_en#:~:text=Your%20company%2Forganisation%20has%20a,security%20of%20your%20IT%20systems.) of an entity (e.g., a company).

However, it doesn’t suffice to state that you need to collect data as a legitimate interest. The point is currently [extensively discussed](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/lawful-basis-for-processing/legitimate-interests/). You should check with a lawyer, under which particular circumstance it is okay for your business to collect and process information about the user if solely based on legitimate interest.

In essence, this option is the least privacy-friendly, but it may help you to continue analyzing and marketing to your website visitors.

## Option B - A/B Testing

Testing various versions of your consent banner might increase your consent rate.

In some cases, companies supposedly **improved their consent rates up to around 80%**. However, their banner’s design might not always be user-friendly as they use the fact that people want to get beyond the cookie banner as quickly as possible. As such, companies place an acceptance button very prominently to nudge visitors into giving their consent.

One good example of a banner that might **boost the consent rate** is Deutsche Telekom:

[![Consent banner example](/media/handle-opaque-traffic/telekom_consent-banner.jpg)](/media/handle-opaque-traffic/telekom_consent-banner.jpg)

While it’s hard to miss the accept button, it is still relatively easy to spot the options to decline cookies or to change the default settings as you skim the text. Also, notice how the button just reads _“Accept”_ instead of _“Accept all.”_ I’d argue (without actually having tested it) that the first feels less intrusive to most people, as you seemingly accept just one thing you don’t know. _“Accept all”_ makes you aware of the _“other unkown things”_ you consent to.

Additionally, the visitor can’t use the website unless he either accepted or declined.

In summary, the consent banner may not be the most user-friendly, but it’ll probably **get you back a high portion of your former traffic**.

There are many ways to adapt your consent banner and boost your consent rate. However, keep your visitors in mind. **Even though they tend to accept more often doesn’t mean they like it**. If your layout is too dubious, it might be considered a [dark pattern](https://darkpatterns.org/index.html) and may eventually harm your brand.

### Testing tools to use

A few Consent Manager services provide you with some testing capabilities out of the box. Others don’t. In such a case, you have to rely on 3rd party tools to make some proper testing.

## Option C - Privacy-friendly Analytics

The idea behind this is relatively simple: use a full-featured analytics software if the user gives his consent and **load a privacy-friendly analytics service by default**. That way, you’ll always get at least some fundamental data about the user behavior on your web resource.

Privacy-friendly analytics solutions usually don’t process any personal information (e.g., [Simple Analytics](https://docs.simpleanalytics.com/gdpr)), which is why they don’t fall under the fangs of GDPR.

Since those services mostly operate without storing any identifiers in your browser (which is why marketers commonly refer to them as “cookieless”), they lack the functionalities that require such an identifier (e.g., creating more sophisticated profiles about your visitors).

Besides getting some primary data about your user’s browsing behavior, you may still track specific user actions on your site, like submitting a form or visiting an individual page.

## Option D - Evaluating server logs

This option doesn’t require any additional (third-party) technology on your website. You already get the data via your server logs, and there’s no need to extend your privacy policy.

Although, without any tracking code on your site, there are fewer things you can measure. It only provides you with the most fundamental data, like which URL your user visited, what site he came from, or what type of browser he used. By default, it’s not possible to report on any specific user actions.

Keep in mind that not all requests from your logs are from real users. Thus, you need to find a reasonable way to filter this [invalid traffic](https://www.cloudflare.com/learning/bots/what-is-bot-traffic/) (e.g., [Googlebot](https://support.google.com/webmasters/answer/182072?hl=en) or other web crawlers).

## Conclusion

**Option A** may help you to circumvent some of the negative impacts of implementing a consent management system. However, I’d suggest only using it very sparsely and double-check with your legal department. It might have severe consequences if you overstep regulatory boundaries, whether from your customers’ backlash or a legal entity’s [penalties](https://www.itgovernance.co.uk/dpa-and-gdpr-penalties).

**Option B** can significantly improve your consent rate even though it most likely won’t be where it was before implementing the Consent Manager. Don’t forget about your users, as they might think of some UI changes as being shady.

Suppose being able to analyze your website traffic is your primary concern. In that case, you may want to have a closer look at **option C or option D**. Due to their more privacy-friendly approach, both possibilities don’t necessarily need consent from your users.

Yet, you should at least inform your visitors that you’re using such technologies to assess your website’s traffic and why it’s vital for you to do so. Eventually, it’s about a **win-win** for everyone. If you can’t analyze what content resonates with your audience, you might end up writing something plain boring.

Finally, which option to emphasize also **depends on your goals**: while all options (to some extend) help you continue to analyze your traffic, only option **A and B** allow you to remarket, re-engage, or communicate with your audience based on their past behavior.

That’s it, folks. I hope you enjoyed the article. Thanks for reading!

<hr>

Something missing, or you want to ask something? **Leave a comment below!**
