# Online Auction App

![](https://ih0.redbubble.net/image.416412087.0587/flat,128x,075,f-pad,128x128,f8f8f8.jpg) 

### Installation

Project pre-requisites: (Please visit the links if you are stuck or confused with the terms used.)

- [.Net Framework](https://dotnet.microsoft.com/) v4.5 to run.
- [Git](https://git-scm.com/) for Version Control
- [Visual Studio](https://marketplace.visualstudio.com) 2013 or [Visual Code](https://visualstudio.microsoft.com)
- [PostMan]() for web api testing (Optional)

Clone the project repository.

```sh
     git clone https://[YOUR USERNAME]@bitbucket.org/jeccastanos/onlineauction.git
```

Open the project with the IDE of your choice to install the dependencies 
or run the following command for Visual Code User (Experimental).

```sh
     cd onlineauction
     code .
```

Note: For Visual Code user make sure you install any C# and related plugins.

Now start coding!!!

### Development

Before adding any files or folders to the project please create your own branch to avoid errors in the main branch and tiresome debugging later on.

Run the following command to create a [branch](https://git-scm.com/docs/git-branch) and [use](https://git-scm.com/docs/git-checkout) branch:

```sh
    git branch feature/[Name of Feature]
    git checkout feature/[Name of the Feature]
```

Example :

```sh
    git branch feature/user_management
    git checkout feature/user_management
```

Online Auction uses MVVM-ish (Model-View-ViewModel) architecture:


| Group |  Use for| Folders|
| ------ | ------ |------|
| Model | [Role Provider](https://dotnettutorials.net/lesson/role-based-authentication-in-mvc/), [IdentityServer](https://dotnettutorials.net/lesson/forms-authentication-in-mvc/), Data Context | Models, Filters |
| View | Front-end, Client Routing via Controller, HTML + CSS, Scripts| Scripts, Views, Fonts, Content|
| View Model | Back-end, Business Logic, [API](https://docs.microsoft.com/en-us/aspnet/web-api/overview/getting-started-with-aspnet-web-api/tutorial-your-first-web-api) | API|

Add your files to the designated folders according to its functionality.

If you feel confuse please don't hesitate to ask [me](https://www.facebook.com/js.castanos)

#### Commit/Upload Changes
If you're ready to [commit](https://git-scm.com/docs/git-commit) your changes to the repository please read the following steps to avoid any errors and headaches.

1\. Always, always and always check the local repo status. Examine and review all staged/unstage files.

```sh
    git status
```

2\. After checking, [exclude](https://compiledsuccessfully.dev/git-skip-worktree/) local Web.config file to avoid unnecessary merge. We have differenct local data source connections and other settings that we don't to include on our main repository.  Now run the following command (You only do this once):

```sh
    cd onlineauction && git update-index --skip-worktree Web.config
```

Note:  If you get ` fatal: Unable to mark file Web.config `, please make sure you follow the format above, since git commands are case-sensitive.

3\. If all checks are done, then proceed to [staging](https://git-scm.com/docs/git-add), [commiting](https://git-scm.com/docs/git-commit) and [pushing](https://git-scm.com/docs/git-push).

```sh
    git add .
    git commit -m [Your commit message]
    git push
```

4\. After commiting, you can now do a [pull request](https://confluence.atlassian.com/bitbucket/create-a-pull-request-to-merge-your-change-774243413.html). 


#### Notice
This documentation focuses on the steps needed in order to clone, develop and commit to this project repository. If you feel lost following this guide, please contact [me](https://www.facebook.com/js.castanos) immediately.

