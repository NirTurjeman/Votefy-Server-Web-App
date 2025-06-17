# Votefy App

This is a basic demonstration app for the **Votefy** voting system.

## Overview

The app is designed to showcase how the Votefy client library works in practice. It checks for open polls available to the user and prompts them to vote immediately when launching the app.

## Features

- Automatically checks for active polls on launch
- Displays poll (multiple-choice or open text)
- Forces the user to vote before proceeding
- Submits vote using the shared Votefy library

## Technologies

- **Language:** Kotlin
- **Architecture:** MVVM
- **Library:** Uses the internal Votefy client library
- **UI:** Basic Android interface for demonstration purposes

## How It Works

1. When the app starts, it checks if there's a poll the user hasn't voted in.
2. If such a poll exists, it is displayed immediately.
3. The user must submit their vote to continue using the app.
4. The vote is sent to the backend via the Votefy library.

## Purpose

This app is intentionally simple. It serves as a proof-of-concept to help developers understand how to use the Votefy library in a real application.
