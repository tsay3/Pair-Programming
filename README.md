# Pair Programming

This (incomplete) application is intended to implement pair programming sessions across multiple client windows. A client (the host) can host a session by inputting a new session ID, and are taken to a window where they can enter code. Another client (the guest) can then be joined a host's session by inputting the same session ID. The guest cannot edit code, but can view the host's code in real time. Both the guest and the host can request to swap roles; if the other consents, the guest gains the host's abilities to edit code, while the host loses theirs but can watch the guest edit in real time.

This implementation was built by Brandon Gonzalez, Timothy Kazarinoff, Rowan Mundrawala, and Thomas Say.

# Getting Started

Download the code to a local repository, and type `npm start'. This starts the server and lets you view the webpage at https://localhost:3000 .

# Thomas Say's contributions

Thomas Say fully wrote the following files:
* App.js
* /js/WindowManager.js
* /js/WelcomeScreen.js
* /js/Editor.js
* /js/SessionSelector.js
* /js/SwapRequest.js
* /js/viewer.js
* /js/HostSelector.js
* /css/WindowManager.css

Thomas Say also partially wrote the following files:
* /css/WelcomeScreen.css (lines 1-144)

# Known bugs
The application was never fully finished. Among the serious issues:
* Code written in the host's window will not appear in the guest's.
* Code written in the host's window is not saved in a database and reloaded across multiple sessions.
* Roles between host and guest do not switch upon selecting.
* There are no IDE features for any language such as smart formatting or autocomplete.
