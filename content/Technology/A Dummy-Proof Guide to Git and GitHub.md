---
title: A Dummy-Proof Guide to Git and GitHub
draft: false
tags:
  - Technology
  - "#Git"
  - "#GitHub"
  - "#OpenSource"
created: 2025-02-03
modified:
---
If you've ever looked up a Git or GitHub tutorial, you've probably been overwhelmed by the complexity. It can seem like a huge, intimidating system full of jargon. But let me tell you, it doesn't need to be that complicated. In fact, I've been there, so I think I can break it down in the simplest way possible – like explaining it to a five-year-old. When I study too, that's exactly what I want from my teachers: teach me like I’m a beginner, because that’s how I learn best. So let’s start with Git and GitHub, making it as easy to understand as possible.

![Github Logo](https://i.ytimg.com/vi/OEGm7LXAN_c/maxresdefault.jpg)

### What is Git?

Let’s start with Git. Git is a tool that’s like a memory card for your code. Imagine you're working on a project with files, like HTML, CSS, JavaScript, or any programming language. When you're coding, you don’t want to lose your progress – just like in a video game where you save your game regularly. With Git, you save your code’s progress, so if something goes wrong, you can go back to an earlier point where everything was fine.

- **Git on Mac and Linux**: If you're using a Mac or Linux, you probably already have Git installed. It's just there, ready for you to use.
- **Git on Windows**: If you’re on Windows, you’ll need to download something called _Git Bash_. Just visit the Git website, download it, and it will open a terminal window for you to interact with Git.

Now, why do you need Git? It's essential for every programmer. You can't be successful without knowing how to use Git (no, this is not a challenge), and it's a fundamental tool you'll use alongside coding, the command line, and the terminal. So, let’s go through how Git works in simple terms.

### How Git Works: The Basics

Imagine you're working on a project and have created an `index.html` file and an `app.css` file. But what if one of them gets deleted? Without Git, it’s gone forever. With Git, however, you can save the changes you make at any point in time.

#### Key Git Commands

To use Git, you need to know a few basic commands. Here's how it works:

1. **Initializing Git**: To start using Git in a project, you first need to initialize it. In your project folder, just type the following:

   ```bash
   git init
   ```

This command sets up a Git repository, just like inserting a memory card into your video game. Now, you can save your progress.

2. **Saving Your Progress**: To save your changes, use `git add`. This command tells Git what changes you want to save.

    ```bash
      git add .
    ```
        
     - If you want to save specific files, just specify the file name, like 
    
     ```bash
       git add index.html
     ```

3. **Committing Your Changes**: Once you've added the files you want to save, you need to commit them. Think of this as hitting the "save" button on your game. To do this, type:
    
 ```bash
git commit -m "Your commit message"
```

    This saves your changes and gives them a label (a message) so you can remember what you've done.
    

For example, after adding `index.html` and `app.css`, you would use:

   ```bash
`git commit -m "Add HTML and CSS files"`
   ```

And if you make more changes, like adding a JavaScript file (`app.js`), you can save those too with a new commit.

4. **Viewing History**: To see all your saved changes, use:

   ```bash
   git log
   ```

   This shows the history of commits, including timestamps and hash codes.

5. **Going Back to Previous Versions**: If you want to go back to an earlier saved state, use the hash code from `git log` and type:

   ```bash
   git checkout <hash_code>
   ```

   This takes you back to a specific commit, effectively restoring your project to an earlier version.

### What is GitHub?

Now that you understand how Git works locally on your computer, let's talk about GitHub. GitHub is a website where you can upload your code so other people can access it. Think of GitHub as a cloud where you can store your saved progress and collaborate with others. It’s similar to other platforms like Bitbucket or GitLab.

Here’s how it works:

- **Create a GitHub Repository**: First, you need a GitHub account and then create a new repository. This is like creating a folder on GitHub where your code will live.
- **Linking Your Local Code to GitHub**: To upload your local code to GitHub, you’ll use a command to add a _remote_ link:

   ```bash
    `git remote add origin <GitHub-repository-URL>`
    ```
    
    After that, you can push your local changes to GitHub using:
    
     ```bash
     git push -u origin master
     ```

### Branches in Git

I won’t go too deep into branches, but it’s worth mentioning. A branch is like a separate “path” where you can make changes without affecting the main code. For example, if you're working on a new feature but don't want to mess with the main project, you can create a new branch.

To create a new branch, use:

   ```bash
 git checkout -b <branch-name>
   ```

You can then work on your new branch without affecting the main project. If you’re happy with the changes, you can merge your branch back into the main one.

### Collaboration with GitHub

One of the most powerful aspects of GitHub is collaboration. If you’re working with a team, they can download your code, make changes in their own branches, and then push their changes back to GitHub. You can review those changes and merge them into the main project. This allows you to collaborate on projects without overwriting each other's work.

### Syncing Your Local and GitHub Repositories

Always make sure your local Git repository is in sync with GitHub. If there are updates on GitHub that you don't have, pull them down with:

   ```bash
git pull origin master
   ```

If you've made changes locally that aren't on GitHub yet, push them up with:

   ```bash
git push origin master
   ```

### Conclusion: Why Git and GitHub Matter

Git is essential for managing your code, and GitHub is the platform that helps you share and collaborate with others. While you don't need GitHub to use Git, you'll definitely want it when collaborating with others or when you need to back up your code online.

Don't worry too much about the advanced features right now. For most projects, knowing how to save your progress with `git add` and `git commit`, and pushing it to GitHub, will be enough to get you started.

Git and GitHub are like the basic tools every programmer needs. Once you understand them, you'll have a much easier time working on projects, collaborating with others, and keeping your code safe.