---
title: How to use a different Google Analytics property for previewing your implementation
date: "2020-07-24T20:03:30.121Z"
template: "post"
draft: false
slug: "how-to-use-a-different-ga-property-for-previewing-your-implementation"
category: "Tag Management"
tags:
    - "Google Tag Manager"
    - "Google Analytics"
description: "Explains how to use different GA Tracking Ids in Tag Manger."
socialImage: ""
---

Ever wondered if it’s possible to **use a different GA property for previewing and testing your Google Analytics implementation** without polluting your regular GA property? 

It’s relatively easy to do, with a *Lookup Table* and two *Constant* variables.

## GTM setup

1. From your *Workspace*, **go into** the *Variables* section.

[![Workspace](/media/ga-properties-env/setup_0_go_to_variables_menu.jpg)](/media/ga-properties-env/setup_0_go_to_variables_menu.jpg)

2. **Select** *New*.

[![Variable Menu](/media/ga-properties-env/setup_1_variables_menu_select_new.jpg)](/media/ga-properties-env/setup_1_variables_menu_select_new.jpg)

3. **Choose** the *Constant* variable type.

[![Select Constant](/media/ga-properties-env/setup_2_choose_constant_variable.jpg)](/media/ga-properties-env/setup_2_choose_constant_variable.jpg)

4. (1) You may **name** the variable '*constant - GA Tracking Id - Live*'. Feel free to choose any other naming convention. (2) **Paste** the Google Analytics Tracking Id from the property you want to use for your live website. (3) **Save** the variable.

[![Paste GA Tracking Id - Live](/media/ga-properties-env/setup_3_paste_tracking_id_live.jpg)](/media/ga-properties-env/setup_3_paste_tracking_id_live.jpg)

5. Create another *Constant* variable (**repeat** steps 2 and 3): 

(1) You may **name** the variable '*constant - GA Tracking Id - Default*'. Feel free to choose any other naming convention. (2) **Paste** the Google Analytics Tracking Id from the property you want to use for all other cases, **except** your live website (e.g., for the [*Preview Mode*](https://support.google.com/tagmanager/answer/6107056?hl=en=)). (3) **Save** the variable.

[![Paste GA Tracking Id - Default](/media/ga-properties-env/setup_4_copy_tracking_id_default.jpg)](/media/ga-properties-env/setup_4_copy_tracking_id_default.jpg)

6. From the *Variables* section, **click** *Configure*.

[![Select Configure](/media/ga-properties-env/setup_5_variables_menu_select_configure.jpg)](/media/ga-properties-env/setup_5_variables_menu_select_configure.jpg)

7. **Check** the checkbox next to *Environment Name*.

[![Check Environment Name](/media/ga-properties-env/setup_6_check_environment_name_built-in_variable.jpg)](/media/ga-properties-env/setup_6_check_environment_name_built-in_variable.jpg)

This step allows us to use the value set by GTM depending on the Environment we are in. *Live* and *Latest* are set up by default.

For example, if we are in the *Live* environment (i.e., the Tag Manager *Version*, which is active on your website right now), the value of the *Environment Name* variable will be the string *"Live"*. On the other hand, the value for the *Preview Mode* will be something like *"Preview Environment 1 2020-06-08 121645"*.

Please note that for this to work, you need to replace the default container code on your website with the container snippet from the *Live* environment. We are going through this step by step later on (see [**Replace your GTM Container**](#replace-your-gtm-container)).

Finally, you could also set up custom [Environments](https://support.google.com/tagmanager/answer/6311518?hl=en) if you're using multi-tiered environments in your development workflow (e.g. 'development', 'staging', and 'production'.). However, this not necessary for this setup to work.

8. **Create** a new variable from the *Variables* section (see step 1 - 2). **Choose** the *Lookup Table* variable type.

[![Select Lookup Table](/media/ga-properties-env/setup_7_choose_lookup_table.jpg)](/media/ga-properties-env/setup_7_choose_lookup_table.jpg)

9. (1) You may **name** the variable '*lookup - GA Tracking Id*'. Feel free to choose any other naming convention. (2) **Select** the built-in *{{Enviroment Name}}* variable from the dropdown menu as *Input Variable*. (3) **Type in** *Live* into the *Input* field of the *Lookup Table*. (4) **Select** *{{constant - GA Tracking Id - Live}}* as *Output* of the *Lookup Table*. (5) **Set** *{{constant - GA Tracking Id - Default}}* as the *Default Value*. (6) **Save** the variable.

[![Configure Lookup Table](/media/ga-properties-env/setup_8_configure_lookup_variable.jpg)](/media/ga-properties-env/setup_8_configure_lookup_variable.jpg)

At runtime, the *Lookup* variable extracts the value from the *{{Environment Name}}* variable, and **uses it as a key** to look up the pre-defined output value in the *Lookup Table* [(3) & (4)].

For instance, if the value of the *{{Environment Name}}* variable is *"Live"*, the *Lookup* variable searches the *Lookup Table* for any *Input* field which equals the string *"Live"*. In case it finds a matching value, it will output what is stored in the *Output* field (4). If there isn't a match, i.e., the *{{Environment Name}}* variable equals something other than *"Live"* (e.g., for the *Preview Mode*), the *Default Value* (5) is applied instead.

10. From the *Variables* section, **select** your *Google Analytics settings variable*. If you don't have any yet, create one by following the [official instructions](https://support.google.com/tagmanager/answer/9207621?hl=en).

[![Variable section - final](/media/ga-properties-env/setup_9_a_variable_section_final.jpg)](/media/ga-properties-env/setup_9_a_variable_section_final.jpg)

11. (1) **Select** *{{lookup - GA Tracking Id}}* as *Tracking Id*. (2) **Save** the variable.

[![Update GA settings variable](/media/ga-properties-env/setup_9_b_update_ga_settings_variable.jpg)](/media/ga-properties-env/setup_9_b_update_ga_settings_variable.jpg)

Now, your GA Tracking Id will be **set dynamically**, depending on the *Environment* you're currently in.

12. Your *Workspace Changes* should now look similar to the following:

[![Workspace - Final](/media/ga-properties-env/setup_10_final_check_workspace_changes.jpg)](/media/ga-properties-env/setup_10_final_check_workspace_changes.jpg)

## Replace your GTM Container

As a **final setup step**, you need to replace the existing container on your website with the container from the *Live* environment.

1. From your *Workspace*, **go** to the *Admin* section.

[![Select Admin section](/media/ga-properties-env/setup_11_go_to_admin_section.jpg)](/media/ga-properties-env/setup_11_go_to_admin_section.jpg)

2. **Select** *Environments*.

[![Click on Environments](/media/ga-properties-env/setup_12_click_on_environments.jpg)](/media/ga-properties-env/setup_12_click_on_environments.jpg)

3. Get the container code of the *Live* environment by **clicking** on *Get Snippet*.

[![Get Container Snippet - Live](/media/ga-properties-env/setup_13_click_on_get_snippet.jpg)](/media/ga-properties-env/setup_13_click_on_get_snippet.jpg)

4. **Replace** the current (default) container code on your website with the JavaScript snippet you get from the pop-up.

[![Replace current Container](/media/ga-properties-env/setup_14_replace_container_code_on_your_site.jpg)](/media/ga-properties-env/setup_14_replace_container_code_on_your_site.jpg)

The **difference** between the default container, and the specific *Live Environment* container, is **highlighted in yellow**.

This step is necessary for the built-in *{{Environment Name}}* variable, we enabled earlier, to contain the correct value depending on the environment we are in.

Using the default container code will result in the *{{Environment Name}}* variable being empty. As a consequence, the value of the *Constant* variable *{{constant - GA Tracking Id - Default}}* will be used **in all environments**, including the *Live* environment. That's not what we want!

## Verify correct setup

### Preview Mode

1. In your *Workspace*, **click** the *Preview* button in the upper right corner.

[![Preview Mode](/media/ga-properties-env/testing_1_go_into_preview.jpg)](/media/ga-properties-env/testing_1_go_into_preview.jpg)

2. Using a different browser tab, **navigate** to your deployed website. You may use [Google’s Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-by-google/kejbdjndbnbjgmefkgdddjlbokphdefk/) to **check** if the correct (Default) GA Tracking Id is used.

[![Check GA Tracking Id - Default](/media/ga-properties-env/testing_2_check_if_tracking_id_is_default.jpg)](/media/ga-properties-env/testing_2_check_if_tracking_id_is_default.jpg)

### Live Environment

Finally, to verify that the correct (Live) GA Tracking Id is used on your deployed website, we need to **publish your changes first**.

3. From your *Workspace*, publish your *Workspace Changes* by **clicking** the *Submit* button in the upper right corner.

[![Publish Workspace Changes](/media/ga-properties-env/testing_3_publish_workspace_changes.jpg)](/media/ga-properties-env/testing_3_publish_workspace_changes.jpg)

4. **Click** the *Publish* button in the upper right corner. Choose a proper *Version Name*, and optionally, a longer, more helpful *Version Description*.

[![Preview Mode](/media/ga-properties-env/testing_4_publish_workspace_changes_description.jpg)](/media/ga-properties-env/testing_4_publish_workspace_changes_description.jpg)

5. Using a different browser tab, **navigate** to your deployed website. **Check** if the correct (Live) GA Tracking Id is used.

[![Check GA Tracking Id - Live](/media/ga-properties-env/testing_5_check_if_tracking_id_is_live.jpg)](/media/ga-properties-env/testing_5_check_if_tracking_id_is_live.jpg)

### Google Analytics

6. **Lastly**, you should see a real-time page view hit in your *Analytics Dashboard*. Make sure Analytics reflects the proper URL changes in the *Content* section while navigating through your website.

[![Preview Mode](/media/ga-properties-env/testing_6_verify_setup_in_analytics.jpg)](/media/ga-properties-env/testing_6_verify_setup_in_analytics.jpg)

That’s it, folks. I hope you enjoyed the article. Thanks for reading!

<hr>

Something missing, or you still find it confusing? **Leave a comment below!**