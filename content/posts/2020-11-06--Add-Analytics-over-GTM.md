---
title: How to add Google Analytics to your Gatsby site over Google Tag Manager
date: "2020-06-11T16:46:37.121Z"
template: "post"
draft: false
slug: "how-to-add-google-analytics-to-your-gatsby-site-over-google-tag-manager"
category: "Tag Management"
tags:
    - "Google Tag Manager"
    - "Google Analytics"
    - "Gatsby"
description: "Explains how to implement Google Analytics over Google Tag Manager in Gatsby."
socialImage: "/media/setup-tagmanager/social-image.jpg"
---

In general, there are three ways to add Google Analytics to your Gatsby site:

1. Install and configure the [Google Analytics Gatsby plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/?=analy).
2. Install and configure the [Google Global Site Tag Gatsby plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-google-gtag/).
3. Install the [Google Tag Manager Gatsby plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-google-tagmanager/) and add an Analytics Tag in Google Tag Manager.

For this website, I decided to go with the third option because I might want to add some non-Google tags later on.

However, I didn’t find the integration to be as straightforward as the first and second option, which is why I wrote a short post outlining the exact steps to be taken for the minimal default setup, to get you started as quickly as possible.

Note, that you could also install the Google Tag Manager plugin AND install Google Analytics via the dedicated analytics plugin. I just don’t see any meaningful reason (yet) to do that. It feels redundant and I prefer to have all my tags in one place. Let me know if you think differently.

If you don’t have a Google Tag Manager Account yet, go to [tagmanager.google.com](https://tagmanager.google.com/) and follow the steps from the official documentation to set up a new account: [Create a new account and container](https://support.google.com/tagmanager/answer/6103696?hl=en#new).

If you access your new Tag Manager container for the first time, a pop-up with some code snippets and implementation details appears:

[![Tag Manager container code snippet](/media/setup-tagmanager/setup_0.jpg)](/media/setup-tagmanager/setup_0.jpg)

You can skip it since the Tag Manager plugin already takes care of creating and implementing the code for you.

## Gatsby GTM integration

For this guide, I'm assuming that you've already created and deployed a Gatsby site. In case you haven't, you can get easily started with one of [Gatsby's Starters](https://www.gatsbyjs.org/starters/?v=2).

1. Open up the Command Line and type in either of the following, depending on what package manager you prefer:

```
npm install --save gatsby-plugin-google-tagmanager

yarn add gatsby-plugin-google-tagmanager
```

2. Open your gatsby-config.js file on your local machine and paste in the following snippet at the top of your plugins array:

```javascript
plugins: [
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "YOUR_GOOGLE_TAGMANAGER_ID",
        includeInDevelopment: false,
      },
    },
	...
  ],
```

3. Replace the id property with your Tag Manager container id: _“GTM-XXXXXX”_.
4. Deploy your changes.

Next, we will **implement Google Analytics via GTM**.

## Google Analytics setup over Tag Manager

1. Go to your Tag Manager container workspace under [tagmanager.google.com](https://tagmanager.google.com/) and click **New Tag**.

[![Click New Tag](/media/setup-tagmanager/setup_1.jpg)](/media/setup-tagmanager/setup_1.jpg)

2. Click into the Tag Configuration box and choose the first option: **Google Analytics: Universal Analytics**.

[![Choose tag type](/media/setup-tagmanager/setup_2.jpg)](/media/setup-tagmanager/setup_2.jpg)

3. Leave the **Track Type** value as **Page View** and select **New Variable...** from the **Google Analytics Settings** dropdown menu.

[![Create new variable](/media/setup-tagmanager/setup_3.jpg)](/media/setup-tagmanager/setup_3.jpg)

4. Type in your [Google Analytics Tracking ID](https://support.google.com/tagmanager/answer/9207621?authuser=3#ga_id) and hit **Save**. Use the default **Variable Name**.

[![Create new variable](/media/setup-tagmanager/setup_4.jpg)](/media/setup-tagmanager/setup_4.jpg)

5. Select the newly created variable. Next, click into the **Triggering** box.

[![Select variable](/media/setup-tagmanager/setup_5.jpg)](/media/setup-tagmanager/setup_5.jpg)

6. Click the **+** symbol in the upper right corner to create a new trigger. Click into the appearing **Trigger Configuration** box.

[![Click plus symbol](/media/setup-tagmanager/setup_6.jpg)](/media/setup-tagmanager/setup_6.jpg)

7. Choose the **Custom Event** trigger type.

[![Choose Custom Event](/media/setup-tagmanager/setup_7.jpg)](/media/setup-tagmanager/setup_7.jpg)

8. Type in **gatsby-route-change** into the **Event name** input field. Leave the rest as is and hit **Save**. Choose a proper naming for the Trigger, like **_gatsby-route-change_**.

[![Type in event name](/media/setup-tagmanager/setup_8.jpg)](/media/setup-tagmanager/setup_8.jpg)

9. Click **Save**. You may rename the Tag or just stick to the default.

[![Click Save](/media/setup-tagmanager/setup_9.jpg)](/media/setup-tagmanager/setup_9.jpg)

**Congrats!** You've installed Google Analytics via Google's Tag Manager on your Gatsby site. Before we go live with the setup, we should test if everything works as planned.

You may skip the next step and go straight to the **Publish Implementation** part if you followed all steps outlined in this tutorial so far. However, it's good practice to **always test your implementation before publishing** it to the live environment.

## Verify correct setup

### Preview Mode

Google Tag Manager offers a **Preview** mode for you to test and debug your implementation.

1. In your workspace, click the **Preview** button in the upper right corner.

[![Click Preview](/media/setup-tagmanager/test_1.jpg)](/media/setup-tagmanager/test_1.jpg)

[![Tag Manager preview mode](/media/setup-tagmanager/test_2.jpg)](/media/setup-tagmanager/test_2.jpg)

2. Using a different tab, navigate to your deployed Gatsby site.

Be aware, that the Preview mode won't work over a local server with the current setup. You may create a development [environment](https://support.google.com/tagmanager/answer/6311518?hl=en) in Tag Manager for that.

If all went well, you can see a message in the Tag's **Summary** pane, verifying that the Analytics Tag has been fired.

[![Preview mode on live website](/media/setup-tagmanager/test_3.jpg)](/media/setup-tagmanager/test_3.jpg)

Apart from that, you can also check your implementation by opening your browser's network tab and search for the requests made by _google-analytics.com_. More conveniently, you may use [Google’s Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-by-google/kejbdjndbnbjgmefkgdddjlbokphdefk/).

### Google Analytics

Last but not least, you should see a real-time page view hit in your Analytics Dashboard. Make sure that Analytics reflects route changes by navigating through your Gatsby site.

[![Check Analytics](/media/setup-tagmanager/test_4.jpg)](/media/setup-tagmanager/test_4.jpg)

## Publish Implementation

1. In your workspace, click the **Submit** button in the upper right corner.

[![Submit](/media/setup-tagmanager/publish_1.jpg)](/media/setup-tagmanager/publish_1.jpg)

2. Click the **Publish** button in the upper right corner. You may or may not choose a proper name and description for your version. I named my version, plain and simple, **"Google Analytics setup"**, and left the description blank.

[![Submit](/media/setup-tagmanager/publish_2.jpg)](/media/setup-tagmanager/publish_2.jpg)

That’s it, folks. I hope you enjoyed the article. Thanks for reading!

<hr>

Something missing or you still find it confusing? **Leave a comment below!**
